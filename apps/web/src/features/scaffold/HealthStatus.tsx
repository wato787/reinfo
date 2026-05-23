import { useEffect, useState } from "react";

import { Badge } from "../../components/Badge";
import { healthResponseSchema, type HealthResponse } from "@reinfo/shared";

type HealthState =
  | { kind: "loading" }
  | { kind: "ready"; value: HealthResponse }
  | { kind: "error" };

export function HealthStatus() {
  const [health, setHealth] = useState<HealthState>({ kind: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/health", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("health request failed");
        }

        return healthResponseSchema.parse(await response.json());
      })
      .then((value) => setHealth({ kind: "ready", value }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setHealth({ kind: "error" });
      });

    return () => controller.abort();
  }, []);

  return (
    <div>
      <span>Worker API</span>
      <Badge tone={getBadgeTone(health)}>{formatHealth(health)}</Badge>
    </div>
  );
}

function getBadgeTone(health: HealthState) {
  switch (health.kind) {
    case "loading":
      return "neutral";
    case "ready":
      return health.value.status === "ok" ? "success" : "danger";
    case "error":
      return "danger";
  }
}

function formatHealth(health: HealthState) {
  switch (health.kind) {
    case "loading":
      return "確認中";
    case "ready":
      return health.value.status === "ok" ? "接続済み" : "要確認";
    case "error":
      return "未接続";
  }
}
