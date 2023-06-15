import zod from "zod";

export const EmailValidation = zod.object({
    email: zod.string({ required_error: "Email required" }).email("Email invalid"),
});

export type EmailType = zod.infer<typeof EmailValidation>;

export const EmailValidationResponse = zod.object({
    valid: zod.boolean(),
    provider: zod.boolean(),
});

export type EmailValidationResponseType = zod.infer<typeof EmailValidationResponse>;

export const EmailCredential = zod.object({
    email: zod.string({ required_error: "Email required" }).email("Email invalid"),
    password: zod
        .string({ required_error: "Password required" })
        .min(5, "Password must contain at least 5 character(s)")
        .max(100, "Password must contain at most 100 character(s)"),
});

export type EmailSignInType = zod.infer<typeof EmailCredential>;

export const UserInformation = zod.object({
    fullName: zod.string().trim().min(1, "Full name is required"),
    age: zod.coerce.number().min(18).max(110),
    address: zod.string().trim().min(1, "Address is required"),
    job: zod.string().trim().min(1, "Job is required"),
    passports: zod.array(zod.string()).optional().default([]),
});

export type UserInformationType = zod.infer<typeof UserInformation>;
