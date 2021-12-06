# Raspberry setup

## From scratch

### Get Raspbian CLI
- Download the [Raspberry PI Imager](https://www.raspberrypi.com/software/)
- Insert your SD card in your computer
- Launch the Raspberry PI Imager
- For the OS option, choose `Raspberry Pi OS (other)`, then `Raspberry Pi OS Lite` (at the moment there is only the 32-bit version available)
- For the storage option, choose your SD card
- (suggestion) Press `ctrl` + `shift` + `x` to access the advanced options: you can change default password here, and pre-configure WiFi access
- Write the OS to the SD card

### Packages
Log in to your PI (by ssh, or if you cannot using a keyboard)

Update the packages:
- `sudo apt update`
- `sudo apt upgrade`

Install the required GUI packages (~90MB of archives):
- `sudo apt install xserver-xorg x11-xserver-utils xinit openbox`

Install chromium-browser (~80MB of archives):
- `sudo apt install chromium-browser`

### Raspi-config
Launch the configuration utility: `sudo raspi-config`:
- System Options > Boot / Auto Login > Console Autologin
- System Options > Network at Boot > Yes
- Display Options > Underscan > No
- Finish (you can reboot now if you want)

### Openbox configuration
Edit the autostart file: `sudo nano /etc/xdg/openbox/autostart`:
Add the following lines:
```bash
# Disable any form of screen saver / screen blanking / power management
xset s off
xset s noblank
xset -dpms

# Allow quitting the X server with CTRL-ATL-Backspace
setxkbmap -option terminate:ctrl_alt_bksp

# Start Chromium in kiosk mode
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' ~/.config/chromium/'Local State'
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/; s/"exit_type":"[^"]\+"/"exit_type":"Normal"/' ~/.config/chromium/Default/Preferences

chromium-browser --kiosk --noerrdialogs --disable-translate --disable-infobars --disable-features=TranslateUI --disk-cache-dir=/dev/null --disable-pinch --overscroll-history-navigation=disabled --disable-features=TouchpadOverscrollHistoryNavigation $JITSI_BOX_URL
```
`ctrl`+`x` to leave the file, then `y` to save, then `enter` to keep same filename


Edit the environment file: `sudo nano /etc/xdg/openbox/environment`:
Add the following line (replace the URL with the one were you deployed the [Jitsi Box UI](./box-ui/README.md), or if you do not have such website, you can contact people from OpenFUN to use their instance):
```bash
export JITSI_BOX_URL=https://your.jitsi-box.url.com
```

### Start on boot
Create or modify the `~/.bash_profile` file by addinf the following lines:
```bash
[[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && startx -- -nocursor
```

### Touchscreen known issue
At the time of the project, Raspbian under Bullseye was recently out, and there was a [known problem](https://forums.raspberrypi.com/viewtopic.php?p=1944679) with the touchscreen: only the first touch was recorded.

To address that, you must modify the `/boot/config.txt` file to use Fake-KMS instead of KMS:
```bash
sudo nano /boot/config.txt
```
Search for the line `dtoverlay=vc4-kms-v3d` (~ line 62), and replace it with `dtoverlay=vc4-fkms-v3d`

Now reboot and enjoy :)

### Notes
- The first time the device enters a Jitsi Room, you may need to accept camera and mic usage
- Depending on your webcam, Jitsi may not be able to detect automatically the mic the first time you join a room, and you may have to choose it from the mic list (for instance, using the Sandberg Webcam, there were 5 webcam mic available, 4 of them were marked with a red alert, and only one had a green sound bar, and was working)


## Using our Image (WIP)

### Downloading and flashing
There is an image which already contains all the above configuration, which you can download [here](https://www.youtube.com/watch?v=dQw4w9WgXcQ), and write on your SD card (on the Raspberry Pi Imager, choose "Custom Image" and choose the image previously downloaded)

### Configuration
You will not have ssh access to this image, so when you boot your raspi, if you want to change anything, plug in a keyboard, press `ctrl` + `alt` + `F2` to open a new terminal, and log in with the default pi credentials.

If you want to change the authorized ssh users:
```bash
nano .ssh/authorized_keys
```
and add your public key.

To change the Jitsi-Box UI website: `sudo nano /etc/xdg/openbox/environment`, and change the line
```bash
export JITSI_BOX_URL=https://your.jitsi-box.url.com
```

Reboot once you are done :)


# Issues

We faced some issues while setting the raspi:

### Using Raspbian Desktop
- Using Raspbian desktop was easier to configure at first, but we had issues with the sound: it seems that the desktop version has `pulsaudio` installed, which conflicts with `alsa`: the result was that the Webcam Mic was detected, but its volume was systematically set to 0 as soon as we tried to raise it. The few seconds we could hear it, there was a lot of noise.

- Desktop version was much more resource-consuming.

- Desktop version also had the 3d acceleration driver problem (need to use `fkms` instead of `kms`)

### Camera
- The camera sometime freezes or has a degraded quality. It seems to be a network related problem, so we advise to use Ethernet instead of WiFi.

- All cameras may not be recognized, you can find the list of tested devices [here](./Hardware_tested.md).

### Microphone
- To check if your microphone is detected, you can run the `arecord -l` command. You can also use `alsamixer` to check the detected sound cards (press `S`), and to change the the input volumes. You can also try to change the `/usr/share/alsa/alsa.conf` file, as explained [here](https://raspberrypi.stackexchange.com/questions/37177/best-way-to-setup-usb-mic-as-system-default-on-raspbian-jessie) (a bit outdated, be careful).

- All microphones may not be recognized, you can find the list of tested devices [here](./Hardware_tested.md).
