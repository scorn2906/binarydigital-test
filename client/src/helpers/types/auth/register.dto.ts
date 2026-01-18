

export interface ReqRegsiterDTO {
    email: string;
    password: string
}

export interface ResRegisterDTO {
    access_token: string;
    user: {
        email: string;
        id: string
    }
}