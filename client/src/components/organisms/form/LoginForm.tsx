"use client"

import { registerSchema, RegisterSchemaType } from "@/src/helpers/schema/auth/register.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../atoms/button/Button"
import { useUserStore } from "@/src/store/useUserStore"
import { loginService } from "@/src/services/auth-services/auth.service"
import { useRouter } from "next/navigation"

const LoginForm = () => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema)
    }) 

    const userStore = useUserStore()
    const router = useRouter()

    const onSubmit = async(data: RegisterSchemaType) => {
            if(data){
                try {
                    const res = await loginService(data)
                    if(res.access_token) userStore.setToken(res.access_token)
                    if(res.user) userStore.setUser(res.user)

                    alert('Login success')
                    router.replace('/')

                    
                } catch (error) {
                    console.error('Login failed:', error)
                    alert(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
                }
    
            }
        }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-md border-2 border-gray-300 rounded-lg p-5 flex flex-col gap-5">
            <div className="text-center">
                <h1>Login</h1>
            </div>
            <div>
                <p>Email</p>
                <input
                    {...register('email')}
                    placeholder="Email"
                    className="border p-2 w-full"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
            </div>

            <div>
                <p>Password</p>
                <input
                type="password"
                {...register('password')}
                placeholder="Password"
                className="border p-2 w-full"
                />
                {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
            </div>

            <Button disabled={isSubmitting} className="btn-primary">
                Submit
            </Button>
        </form>
        
    )
}

export default LoginForm