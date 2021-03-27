// Generated using typescript-generator version 2.0.400 on 2021-03-27 11:56:19.

export interface AuthenticationRequest {
    username?: string;
    password?: string;
}

export interface AuthenticationResponse {
    authenticationToken?: string;
    refreshToken?: string;
    expireAt?: Date;
    username?: string;
}

export interface AuthenticationResponseBuilder {
}

export interface RefreshTokenRequest {
    refreshToken?: string;
    username?: string;
}

export interface Message {
    type?: MessageType;
    content?: string;
    sender?: string;
    time?: string;
}

export interface MessageBuilder {
}

export const enum MessageType {
    MESSAGE = 'MESSAGE',
    CONNECT = 'CONNECT',
    DISCONNECT = 'DISCONNECT',
}
