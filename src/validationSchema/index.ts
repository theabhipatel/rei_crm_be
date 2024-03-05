import { string, object } from "zod";

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
