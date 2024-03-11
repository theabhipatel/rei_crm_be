import { string, object, boolean } from "zod";

export const registerUserSchema = object({
  body: object({
    fullname: string({ required_error: "fullname is required." }),
    email: string({ required_error: "email is required." }).email(),
    password: string({ required_error: "password is required." }).min(4, "password must be 4 char long."),
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: "email is required." }).email(),
    password: string({ required_error: "password is required." }),
  }),
});

export const updateAgentSchema = object({
  body: object({
    fullname: string().optional(),
    email: string().email().optional(),
    password: string().min(4, "password must be 4 char long.").optional(),
    isVerified: boolean().optional(),
    isBlocked: boolean().optional(),
  }),
});

// ###########  Super admin's routes input validation Schema #######

export const addAdminSchema = object({
  body: object({
    fullname: string({ required_error: "fullname is required." }),
    email: string({ required_error: "email is required." }).email(),
    password: string({ required_error: "password is required." }).min(4, "password must be 4 char long."),
  }),
});

export const updateAdminSchema = object({
  body: object({
    fullname: string().optional(),
    email: string().email().optional(),
    password: string().min(4, "password must be 4 char long.").optional(),
    isVerified: boolean().optional(),
    isBlocked: boolean().optional(),
  }),
});
