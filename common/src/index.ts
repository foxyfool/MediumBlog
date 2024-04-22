import z from "zod";

export const signupInput = z.object({
  email: z.string().email("Please provide a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  name: z.string().min(3, "Name must be at least 3 characters long."),
});

export type SignupInput = z.infer<typeof signupInput>;

export const signinInput = z.object({
  email: z.string().email("Please provide a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

export type SigninInput = z.infer<typeof signinInput>;

export const createBlogInput = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  content: z.string().min(10, "Blog body must be at least 10 characters long."),
});

export type createBlogInput = z.infer<typeof createBlogInput>;

export const updateBlogInput = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  content: z.string().min(10, "Blog body must be at least 10 characters long."),
  id: z.string().min(1, "ID must be a non-empty string."),
});
export type updateBlogInput = z.infer<typeof updateBlogInput>;
