import { string, object, boolean, number, enum as enum_, array } from "zod";

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

const EnumType = enum_(["Monthly", "Yearly"]);

export const createPlanSchema = object({
  body: object({
    title: string({ required_error: "title is required." }),
    type: EnumType,
    users: number({ required_error: "users is required." }),
    price_permonth: number({ required_error: "price is required." }),
    description: string({ required_error: "description is required." }),
    details: array(
      object({
        title: string(),
        description: string(),
      }),
    ),
  }),
});
