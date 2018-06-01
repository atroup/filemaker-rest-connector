export interface ApiLoginResponse {
    response: {
        token: string;
    };
    messages: object[];
}

export interface ApiLogoutResponse {
    response: {
        token: string;
    };
    messages: object[];
}
