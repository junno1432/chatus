import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

export const passwordMatchSchema = z.object({
    password: passwordSchema,
    passwordConfirm: z.string().min(8),
}).superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords do not match",
            path: ["passwordConfirm"],
        })
    }
})