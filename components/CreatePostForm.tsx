"use client";

import { formSchema } from "@/lib/formSchema";
import { createProductAction } from "@/server/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { Label } from "./ui/label";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

const CreatePostForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: "",
    },
  });

  const router = useRouter();

  const { execute, status } = useAction(createProductAction, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success("Product created successfully", { duration: 1000 });
      }
    },
  });

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    execute({ ...values, image: imageUrl });
    form.reset();

    router.push("/");
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onFormSubmit)}>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    placeholder="product description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="product price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <>
                    <input type="hidden" name="image" value={imageUrl} />
                    <UploadDropzone
                      endpoint="imageUploader"
                      onClientUploadComplete={res => {
                        if (res && res.length > 0) {
                          setImageUrl(res[0].url);
                          toast.success("Image file uploaded successfully", {
                            duration: 1000,
                          });
                        }
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(`ERROR! ${error.message}`);
                      }}
                    />
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={status === "executing"} type="submit">
          {status === "executing" ? " Please wait..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default CreatePostForm;
