import type { ComponentPropsWithoutRef } from "react";

import styles from "./Textarea.module.css";

export type TextareaProps = ComponentPropsWithoutRef<"textarea">;

export function Textarea({ className, ...props }: TextareaProps) {
  return <textarea className={[styles.root, className].filter(Boolean).join(" ")} {...props} />;
}
