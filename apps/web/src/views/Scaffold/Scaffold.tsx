import { Button } from "../../components/Button";
import { Panel } from "../../components/Panel";
import { HealthStatus } from "./HealthStatus";
import styles from "./Scaffold.module.css";

export function Scaffold() {
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
        <div className={styles.actions}>
          <Button>候補地を追加</Button>
          <Button variant="secondary">調査結果を見る</Button>
        </div>
        <div className={styles["status-row"]}>
          <HealthStatus />
        </div>
      </Panel>
    </main>
  );
}
