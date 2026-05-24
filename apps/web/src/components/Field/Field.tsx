import { Field as BaseField } from "@base-ui/react/field";

import styles from "./Field.module.css";

export type FieldProps = BaseField.Root.Props;
export type FieldLabelProps = BaseField.Label.Props;
export type FieldDescriptionProps = BaseField.Description.Props;
export type FieldErrorProps = BaseField.Error.Props;

export function Field({ className, ...props }: FieldProps) {
  return (
    <BaseField.Root className={[styles.root, className].filter(Boolean).join(" ")} {...props} />
  );
}

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <BaseField.Label className={[styles.label, className].filter(Boolean).join(" ")} {...props} />
  );
}

export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <BaseField.Description
      className={[styles.description, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

export function FieldError({ className, match = true, ...props }: FieldErrorProps) {
  return (
    <BaseField.Error
      className={[styles.error, className].filter(Boolean).join(" ")}
      match={match}
      {...props}
    />
  );
}
