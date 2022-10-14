export interface JamSeshGroup {
    id: number;
    name: string;
}

export interface JamSeshUser {
    id: number;
    firstName: string;
    lastName: string;
    status: string;
    avatar: string;
    lat: number;
    lng: number;
    created: string;
    groupId: number;
}

export interface JamSeshTrack {
    id: number;
    src: string;
}