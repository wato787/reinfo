import styles from "./Panel.module.css";

export type PanelProps = {
  children: React.ReactNode;
};

export function Panel({ children }: PanelProps) {
  return <aside className={styles.root}>{children}</aside>;
}
