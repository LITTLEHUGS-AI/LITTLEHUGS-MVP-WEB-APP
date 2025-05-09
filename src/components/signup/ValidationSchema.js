// import { z } from "zod";

// export const SignUpFormSchema = z.object({
//   name: z
//     .string()
//     .min(2, { message: "Name must be at least 2 characters long" })
//     .max(50, { message: "Name must be less than 50 characters" }),

//   email: z
//     .string()
//     .min(1, { message: "Email is required" })
//     .email({ message: "Invalid email address" }),

//   password: z
//     .string()
//     .min(5, { message: "Password must be at least 8 characters" }),
//     // .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter" })
//     // .regex(/[a-z]/, { message: "Password must include at least one lowercase letter" })
//     // .regex(/\d/, { message: "Password must include at least one number" })
//     // .regex(/[^a-zA-Z0-9]/, { message: "Password must include at least one special character" }),

//   city: z
//     .string()
//     .min(2, { message: "City must be at least 2 characters" }),

//   motherTongue: z
//     .string()
//     .min(2, { message: "Mother tongue must be at least 2 characters" }),
// });


import { z } from "zod";

const signUpValidationSchema = z
  .object({
    name: z.string().min(1, "Name is required."),
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
      .regex(/[a-z]/, "Password must include at least one lowercase letter.")
      .regex(/\d/, "Password must include at least one number.")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must include at least one special character."
      ),
    country: z.string().min(1, "Country is required."),
    language: z.string().min(1, "Mother tongue is required."),
  });

export { signUpValidationSchema };
