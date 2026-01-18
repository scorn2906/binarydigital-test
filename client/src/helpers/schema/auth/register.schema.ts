import z from "zod";


export const registerSchema = z.object({
    email: z.string().email('Email format is not valid'),
    password: z.string().min(8)
})

export type RegisterSchemaType = z.infer<typeof registerSchema>