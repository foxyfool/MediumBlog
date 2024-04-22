import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@foxyfool/medium-blogpost";

export const useRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

useRouter.post("/signup", async (c) => {
  // Use safeParseBody to validate the request body
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    // Return an error response with the error message
    return c.json({ message: "error while signup" }, 400);
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt: jwt });
  } catch (e) {
    c.status(403);
    return c.json({ error: "error while signup" });
  }
});

useRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  // Validate the request body using safeParseBody
  const result = signinInput.safeParse(await c.req.json());

  if (!result.success) {
    // If the validation fails, return an error response with the error message
    const errorMessage = result.error.issues[0].message;
    return c.json({ error: errorMessage }, 400);
  }

  // Destructure the validated data from result.data
  const { email, password } = result.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User not found" });
    }

    if (user.password !== password) {
      c.status(403);
      return c.json({ error: "Incorrect password" });
    }

    const jwt = await sign(
      { id: user.id, email: user.id },
      c.env.JWT_SECRET
    );
    return c.json({ jwt: jwt , user: user.id});
  } catch (e) {
    c.status(403);
    return c.json({ error: "error while signin" });
  }
});
