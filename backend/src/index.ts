import { Hono } from "hono";
import { useRouter } from "./routes/user";
import { bookRouter } from "./routes/blog";
import {cors} from "hono/cors";

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use('/*',cors());
app.route("/api/v1/user", useRouter);
app.route("/api/v1/blog", bookRouter);

export default app;
