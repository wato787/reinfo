import { Button as BaseButton } from "@base-ui/react/button";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = ComponentPropsWithoutRef<typeof BaseButton> & {
  variant?: ButtonVariant;
};

export function Button({ className, type = "button", variant = "primary", ...props }: ButtonProps) {
  return (
    <BaseButton
      className={[styles.root, styles[variant], className].filter(Boolean).join(" ")}
      type={type}
      {...props}
    />
  );
}
