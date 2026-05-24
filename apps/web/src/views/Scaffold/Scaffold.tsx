import { useState } from "react";

import { Panel } from "../../components/Panel";
import { CandidateForm, type CandidateFormValues } from "./CandidateForm";
import { CandidateSummary } from "./CandidateSummary";
import { HealthStatus } from "./HealthStatus";
import styles from "./Scaffold.module.css";

export function Scaffold() {
  const [candidate, setCandidate] = useState<CandidateFormValues | null>(null);

  return (
    <main className={styles.root}>
      <section className={styles["map-stage"]} aria-label="候補地マップ">
        <div className={styles["map-placeholder"]}>
          <span>候補地マップ</span>
        </div>
      </section>
      <Panel>
        <p className={styles.eyebrow}>土地調査</p>
        <h1 className={styles.heading}>候補地を調べる土台</h1>
        <p className={styles.summary}>まずは地図、候補地入力、調査レイヤーをここに積み上げます。</p>
        <CandidateForm onSubmit={setCandidate} />
        <CandidateSummary candidate={candidate} />
        <div className={styles["status-row"]}>
          <HealthStatus />
        </div>
      </Panel>
    </main>
  );
}
