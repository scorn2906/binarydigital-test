"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../atoms/button/Button"
import { registerService } from "@/src/services/auth-services/auth.service"
import { registerSchema, RegisterSchemaType } from "@/src/helpers/schema"

const RegisterForm = () => {
    const {register, handleSubmit, formState: {errors, isSubmitting, isValid}} = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema)
    }) 


    const onSubmit = async(data: RegisterSchemaType) => {
        try {
            await registerService(data)
            alert('Register success')    
        } catch (error) {
            alert(`Register failed: ${error}`)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-md border-2 border-gray-300 rounded-lg p-5 flex flex-col gap-5">
            <div className="text-center font-extrabold">
                <h1>Register</h1>
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

            <Button disabled={isSubmitting || !isValid} className="btn-primary">
                Submit
            </Button>
        </form>
        
    )
}

export default RegisterForm