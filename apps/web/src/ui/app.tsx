import { useEffect, useState } from "react";

import { healthResponseSchema, type HealthResponse } from "@reinfo/shared";

type HealthState =
  | { kind: "loading" }
  | { kind: "ready"; value: HealthResponse }
  | { kind: "error" };

export function App() {
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
    <main className="app-shell">
      <section className="map-stage" aria-label="候補地マップ">
        <div className="map-placeholder">
          <span>候補地マップ</span>
        </div>
      </section>

      <aside className="research-panel">
        <p className="eyebrow">土地調査</p>
        <h1>候補地を調べる土台</h1>
        <p className="summary">まずは地図、候補地入力、調査レイヤーをここに積み上げます。</p>
        <div className={`health health-${health.kind}`}>
          <span>Worker API</span>
          <strong>{formatHealth(health)}</strong>
        </div>
      </aside>
    </main>
  );
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
