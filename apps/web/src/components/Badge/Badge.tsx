import styles from "./Badge.module.css";

export type BadgeTone = "neutral" | "success" | "danger";

export type BadgeProps = {
  children: React.ReactNode;
  tone?: BadgeTone;
};

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return <span className={styles[tone]}>{children}</span>;
}
