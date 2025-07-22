import { z } from "zod";

const FormValidator = z.object({
    email: z.email("Invalid email address"),

    topic: z.string().min(3, "Title must be at least 3 characters."),

    description: z.string().optional().refine((val) => !val || val.trim().length >= 10, {
      message: "Description must be at least 10 characters if provided.",
    }),
});

export default FormValidator;