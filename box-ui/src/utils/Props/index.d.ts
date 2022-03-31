import React from 'react';

export type InputRoomWithClose = {
    domain: string;
    roomName: string;
    close: () => void;
};

export type Information = {
    domain: string;
    roomName: string;
};

export type InformationOptional = {
    [Property in keyof Information]?: Type[Property];
};

export type RoomProps = {
    information: Information;
    setInformation: (value: Information) => void;
};

export type ConnectionProps = {
    close: () => void;
    setInformation: (value: Information) => void;
};

export type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
};

interface InformationProps {
    information: Information;
    setInformation: (value: Information) => void;
    close: () => void;
}

export type JitsiFrameProps = {
    information: Information;
    options?: ConstructorParameters<typeof JitsiMeetExternalAPI>[1];
    configure?: (api: JitsiMeetExternalAPI) => void;
    onError?: () => void;
};

export type CounterProps = {
    counter: number;
    domain: string;
    roomName: string;
};

export type CaptureImageProps = {
    roomName: string;
};

export type InputButtonProps = {
    onSubmit: (value: string) => void;
    inputLabel: string;
    buttonLabel: string;
};

export type ProgressButtonProps = {
    initialCounter: number;
    onClick: () => void;
};

export type FocusModeProps = {
    focusItems: { element: string; textElement: string }[];
    setDisplayFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ViewerProps = {
    img1: string;
    img2?: string;
    onclick?: (event: React.MouseEvent) => void;
    coords?: [number, number][];
    selectWindow: boolean;
    loading: boolean;
};

export type SelectButtonProps = {
    div?: React.HTMLAttributes<HTMLDivElement>;
    className?: string;
    menuItemsStyle?: SxProps<Theme>;
    selectItems: {
        inputLabel: { text: string; style?: SxProps<Theme> };
        menuItems: { id: number | string; text: string }[];
    };
    onChange?: (e: SelectChangeEvent<string>) => void;
    onClick?: (e: SelectChangeEvent<string>) => void;
};

export type TutoButtonProps = {
    displayFocus: boolean;
    setDisplayFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SelectFilterButtonProps = {
    requestProcessedImage: (proc: string, afterCrop?: boolean) => void;
    processes: { id: number; text: string }[];
};

export type CropButtonProps = {
    selectCoord: boolean;
    coord: [number, number][];
    validerSaisie: () => void;
    imgIsCropped: boolean;
    resetCadrage: () => void;
    AmeliorerVue: () => void;
};
