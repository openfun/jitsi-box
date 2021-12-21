
# Jitsi Box, an opensource device for hybrid classrooms and conferences

A **hybrid classroom** combines traditional face-to-face teaching with online teaching.

**Our ambition is to blend the virtual classroom with the real classroom through the use of a simple device called the `Jitsi-Box`**.

The `Jitsi-Box` is a case with an interface which allows teachers to connect their physical classroom to their online teaching meeting. 

Ultimately, the idea is to ensure that online students feel as if they were actually in the classroom with easy interactions with their peers in the class and vice-versa.

<p align="center">
  <img src="./docs/images/jitsi-box-in-hybrid-classroom.jpg" width="500" alt="Jitsi Box in hybrid classroom"/>
</p>

In order to do that, the `Jitsi-Box` device can be placed in a classroom (on a wall or desk) and then connected to:

- a sound system to render the sound of the people online
- various cameras dispersed in the room to render the classroom to the people online
- a microphone to take the sound from the classroom
- a TV to see the people online within the classroom

All of these outputs can be chosen by he/she who setups the jitsi-box in a room.

A version of the application is available on https://jitsi-box.com

The application has been configured as a `Progressive Web App` and can therefore be installed on the desktop of any device.

## Architecture

The `Jitsi-box` is made up of 3 essential building blocks: a `React` frontend application, a `Raspberry Pie` controller and a `touchscreen` to control the application.


## Getting Started

### `React` Front-end

A simplified tree of the app:

<pre>
├── src
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── components
│   │   ├── css
│   │   ├── tests
│   │   └── ts
│   │       ├── ConnectionComponent.tsx
│   │       ├── CreateMeetingComponent.tsx
│   │       ├── FormJoinMeeting.tsx
│   │       ├── HomeButtonsComponent.tsx
│   │       ├── HomeComponent.tsx
│   │       ├── JitsiComponent.tsx
│   │       ├── JoinMeetingComponent.tsx
│   │       ├── MarshaLoginComponent.tsx
│   │       ├── PopupComponent.tsx
│   │       ├── QrCodeComponent.tsx
│   │       └── QrCodeScanner.tsx
│   ├── dictionnaries_fr
</pre>

### `Raspberry`

For the setup, please see the following **[SETUP](./SETUP.md)**

The `Raspberry Pi` runs the latest Raspbian OS, based on Debian 11 Bullseye.

Because Raspbian switched recently from Buster to Bullseye, there are still many bugs, especially regarding KMS drivers.

For now, in order to use the touchscreen, you must replace line 62 of `/boot/config.txt`: `dtoverlay=vc4-kms-v3d` by `dtoverlay=vc4-fkms-v3d`.

This switches from KMS drivers to Fake-KMS drivers, resolving the uncatched touch-events problem.

The sound also seems to be a problem: when using a microphone attached to a webcam, depending on the brand and the drivers, the microphone may be recognized but no sound is catched. For now, the only solution is to use an external microphone, or a camera that happens to have a compatible microphone.

## Hardware

Almost all of the hardware used in this project is exchangeable with any other that the users consider fit or easier to acquire.

All we aim to do in this section is to present the hardware that we have selected and tested in our prototype.

- **Controller**: Raspberry Pi 4 B with 4 Go of RAM DDR4 (screen+rpi) ~155€
- **Touchscreen**: 7" capacitive touch screen
- **Case**: a suitable case for the touch screen and the raspberry attached to it
- **Camera & Microphone**: Webcam USB Chat Webcam 1080p Full HD (SANDBERG 134-15) (for now the microphone of the webcam doesn’t work) ~35€
- **Speakers**: LOGITECH S120 Speaker (PC, stereo, S120)  ~15€

Feel free to add your tested hardware **[here](./docs/hardware_tested.md)**


## Deployment

For the deployment setup and launch, please see the following **[ReadMe](./staging/ReadMe.md)**

## Contributors

This project is an MVP developed by 3 MEng Students from the **Paris Digital Lab** a digital innovation program of CentraleSupélec.

The team is composed of:

**Mohamed Khairallah Gharbi \
Arthur Naudy \
Simon Maréchal**

## Contributions

This project is intended to be community-driven, so any PR is welcome !

## License

This work is released under the `MIT License`.
