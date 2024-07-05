"use server";

import db from "@/db/db";
import { productTable } from "@/db/schema";
import { formSchema } from "@/lib/formSchema";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";

const actionClient = createSafeActionClient();

export const createProductAction = actionClient
  .schema(formSchema)
  .action(async ({ parsedInput: { name, description, price, image } }) => {
    console.log(image);
    try {
      await db
        .insert(productTable)
        .values({ name, description, price, image: image })
        .returning();

      revalidatePath("/");
      return { success: "Product created successfully" };
    } catch (error) {
      return { error: "Something went wrong" };
    }
  });
