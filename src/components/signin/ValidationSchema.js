import { z } from "zod";
 
export const SignInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  //   password: z
  //     .string()
  //     .min(8, { message: "Password is required" }),
 
  password: z
    .string()
    .min(5, "Password is required")
    // .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    // .regex(/[a-z]/, "Password must include at least one lowercase letter")
    // .regex(/\d/, "Password must include at least one number")
    // .regex(
    //   /[^a-zA-Z0-9]/,
    //   "Password must include at least one special character"
    // ),
});
 
