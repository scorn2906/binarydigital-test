import { apiRegister } from "@/src/api/apiRegister"
import { ReqLoginDTO, ResLoginDTO } from "@/src/helpers/types/auth/login.dto"
import { ReqRegsiterDTO, ResRegisterDTO } from "@/src/helpers/types/auth/register.dto"


export const registerService = async(payload:ReqRegsiterDTO) => {
    const {data} = await apiRegister.post<ResRegisterDTO>('/api/auth/register', payload)
    return data
}

export const loginService = async(payload: ReqLoginDTO) => {
    const {data} = await apiRegister.post<ResLoginDTO>('/api/auth/login', payload)
    return data
}