import styles from "./AppShell.module.css";

export type AppShellProps = {
  map: React.ReactNode;
  panel: React.ReactNode;
};

export function AppShell({ map, panel }: AppShellProps) {
  return (
    <main className={styles.root}>
      <section className={styles["map-stage"]} aria-label="候補地マップ">
        {map}
      </section>
      {panel}
    </main>
  );
}
