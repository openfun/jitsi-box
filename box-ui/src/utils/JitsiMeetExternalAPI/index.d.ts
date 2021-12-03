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
            interfaceConfigOverwrite?: JitsiMeetExternalAPI.InterfaceConfigOverwrtieOptions;
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
        disablePolls?: boolean;
        hideConferenceSubject?: boolean;
        hideConferenceTimer?: boolean;
        doNotStoreRoom?: boolean;
        prejoinPageEnabled?: boolean;
        resolution?: number;
        toolbarButtons?: string[];
    };
    export type InterfaceConfigOverwrtieOptions = {
        HIDE_INVITE_MORE_HEADER?: boolean;
        TOOLBAR_BUTTONS?: string[];
    };
}
