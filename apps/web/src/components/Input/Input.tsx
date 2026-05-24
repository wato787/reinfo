import { Input as BaseInput } from "@base-ui/react/input";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Input.module.css";

export type InputProps = ComponentPropsWithoutRef<typeof BaseInput>;

export function Input({ className, ...props }: InputProps) {
  return <BaseInput className={[styles.root, className].filter(Boolean).join(" ")} {...props} />;
}
