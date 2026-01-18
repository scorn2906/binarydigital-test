

export interface ReqLoginDTO {
    email: string;
    password: string
}

export interface ResLoginDTO {
    access_token: string;
    user: {
        email: string;
        id: string
    }
}