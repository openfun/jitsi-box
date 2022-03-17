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
    isBox: boolean;
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
}

export type FocusModeProps = {
    focusItems: {element: string, textElement: string}[];
}
