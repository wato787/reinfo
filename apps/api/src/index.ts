import { Hono } from "hono";

import { healthResponseSchema } from "@reinfo/shared";

const app = new Hono();

app.get("/api/health", (context) => context.json(healthResponseSchema.parse({ status: "ok" })));

export default app;
