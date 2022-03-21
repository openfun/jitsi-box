/**
 * This code has been taken and adapted from the Marsha Project:
 * https://github.com/openfun/marsha/blob/master/src/frontend/types/libs/JitsiMeetExternalAPI/index.d.ts
 */

export as namespace JitsiMeetExternalAPI;
export = JitsiMeetExternalAPI;

declare class JitsiMeetExternalAPI {
    constructor(
        domain: string,
        options?: {
            configOverwrite?: JitsiMeetExternalAPI.ConfigOverwriteOptions;
            interfaceConfigOverwrite?: JitsiMeetExternalAPI.InterfaceConfigOverwriteOptions;
            parentNode?: HTMLElement;
            roomName?: string;
            userInfo?: {
                email?: string | null;
                displayName?: string | null;
            };
        },
    );

    getLivestreamUrl: () => Promise<any>;
    executeCommand: (
        command: JitsiMeetExternalAPI.Command,
        options: JitsiMeetExternalAPI.RecordingMode | JitsiMeetExternalAPI.RecordingOptions,
    ) => void;
    addListener: (eventName: string, callback: (event: any) => void) => void;

    dispose: () => void;
}

// tslint:disable-next-line:no-namespace
declare namespace JitsiMeetExternalAPI {
    export type Command = 'startRecording' | 'stopRecording';
    export type RecordingMode = 'stream' | 'file';
    export type RecordingOptions = {
        mode: RecordingMode;
        rtmpStreamKey: string;
    };
    export type ConfigOverwriteOptions = {
        constraints?: {
            video: {
                height: {
                    ideal: number;
                    max: number;
                    min: number;
                };
            };
        };
        conferenceInfo?: {
            alwaysVisible: string[];
            autoHide: string[];
        };
        disableDeepLinking?: boolean;
        disablePolls?: boolean;
        disableSimulcast?: boolean;
        disabledSounds?: string[];
        enableWelcomePage?: false;
        hideConferenceSubject?: boolean;
        hideConferenceTimer?: boolean;
        doNotStoreRoom?: boolean;
        prejoinConfig?: {
            enabled?: boolean;
            hideExtraJoinButtons?: string[];
        };
        prejoinPageEnabled?: boolean;
        preferH264?: boolean;
        resolution?: number;
        startWithVideoMuted?: boolean;
        startWithAudioMuted?: boolean;
        toolbarButtons?: string[];
        toolbarConfig?: {
            initialTimeout?: number;
            timeout?: number;
            alwaysVisible?: boolean;
        };
    };
    export type InterfaceConfigOverwriteOptions = {
        DISABLE_JOIN_LEAVE_NOTIFICATIONS?: boolean;
        DISPLAY_WELCOME_PAGE_CONTENT?: boolean;
        HIDE_INVITE_MORE_HEADER?: boolean;
        MOBILE_APP_PROMO?: boolean;
        SHOW_CHROME_EXTENSION_BANNER?: boolean;
        SHOW_DEEP_LINKING_IMAGE?: boolean;
        TOOLBAR_ALWAYS_VISIBLE?: boolean;
        TOOLBAR_BUTTONS?: string[];
    };
}
