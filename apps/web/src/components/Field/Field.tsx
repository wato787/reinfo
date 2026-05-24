import { Field as BaseField } from "@base-ui/react/field";
import type { ReactNode } from "react";

import styles from "./Field.module.css";

export type FieldProps = {
  children: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  label: ReactNode;
  name?: string;
};

export function Field({ children, description, error, label, name }: FieldProps) {
  return (
    <BaseField.Root className={styles.root} invalid={Boolean(error)} name={name}>
      <BaseField.Label className={styles.label}>{label}</BaseField.Label>
      {children}
      {description ? (
        <BaseField.Description className={styles.description}>{description}</BaseField.Description>
      ) : null}
      {error ? (
        <BaseField.Error className={styles.error} match>
          {error}
        </BaseField.Error>
      ) : null}
    </BaseField.Root>
  );
}
