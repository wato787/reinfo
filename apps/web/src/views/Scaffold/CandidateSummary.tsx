import { Badge } from "../../components/Badge";
import type { CandidateFormValues } from "./CandidateForm";
import styles from "./CandidateSummary.module.css";

type CandidateSummaryProps = {
  candidate: CandidateFormValues | null;
};

export function CandidateSummary({ candidate }: CandidateSummaryProps) {
  if (!candidate) {
    return (
      <section className={styles.root} aria-label="候補地概要">
        <div className={styles.header}>
          <h2>候補地概要</h2>
          <Badge>未入力</Badge>
        </div>
        <p className={styles.empty}>候補地を入力すると、ここに概要を表示します。</p>
      </section>
    );
  }

  return (
    <section className={styles.root} aria-label="候補地概要">
      <div className={styles.header}>
        <h2>候補地概要</h2>
        <Badge tone="success">入力済み</Badge>
      </div>
      <dl className={styles.list}>
        <SummaryItem label="住所" value={candidate.address} />
        <SummaryItem label="緯度" value={candidate.latitude} />
        <SummaryItem label="経度" value={candidate.longitude} />
        <SummaryItem label="販売価格" value={candidate.listingPriceYen} />
        <SummaryItem label="土地面積" value={candidate.landAreaSquareMeters} />
        <SummaryItem label="物件 URL" value={candidate.listingUrl} />
        <SummaryItem label="メモ" value={candidate.note} />
      </dl>
    </section>
  );
}

type SummaryItemProps = {
  label: string;
  value: string;
};

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className={styles.item}>
      <dt>{label}</dt>
      <dd>{value || "未入力"}</dd>
    </div>
  );
}
