import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Your title should be a least three words long" }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Your description should be at least 10 words long" }),
  price: z.coerce.number().positive(),
  image: z.string(),
});
