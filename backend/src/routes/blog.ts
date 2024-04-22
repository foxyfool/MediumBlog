import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@foxyfool/medium-blogpost";

export const bookRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

bookRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization");
  try {
    const user = await verify(authHeader || "", c.env.JWT_SECRET);

    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "Token : You are not logged in !" });
    }
  } catch (e) {
    c.status(403);
    return c.json({ error: "catch block : not logged in" });
  }
});
bookRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Inputs are not correct!" });
  }
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });
  return c.json({
    id: post.id,
  });
});
bookRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Inputs are not correct!" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: body.id,
        authorId: body.authorId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      id: updatedPost.id,
    });
  } catch (e) {
    c.status(411);
    return c.json({ message: "Error while updating post" });
  }
});

bookRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ posts });
  } catch (e) {
    c.status(411);
    return c.json({ message: "Error while fetching post" });
  }
});

bookRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({ post });
  } catch (e) {
    c.status(411);
    return c.json({ message: "Error while fetching post" });
  }
});

bookRouter.delete("/:id", async (c) => {
  const userId = c.get("userId");
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const deletePost = await prisma.post.delete({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ deletePost });
  } catch (e) {
    c.status(411);
    return c.json({ message: "Error while deleting post" });
  }
});
