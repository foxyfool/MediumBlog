import { decode, sign, verify } from "hono/jwt";
import { Hono } from "hono";

export const initMiddleware = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

initMiddleware.use("/api/v1/blog/*", async (c, next) => {
  const tokenToVerify = c.req.header("Authorization") || "";
  if (!tokenToVerify) {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
  const token = tokenToVerify.split(" ")[1];

  const payload = await verify(token, c.env.JWT_SECRET);

  if (!payload) {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
  c.set("userId", payload.id);
  await next();
});



// export function initMiddleware(app) {
//   app.use("/api/v1/blog/*", async (c, next) => {
//     const header = c.req.header("authorization") || "";
//     // Bearer token => ["Bearer", "token"];
//     const token = header.split(" ")[1];

//     // @ts-ignore
//     const response = await verify(token, c.env.JWT_SECRET);
//     if (response.id) {
//       next();
//     } else {
//       c.status(403);
//       return c.json({ error: "unauthorized" });
//     }
//   });
// }
