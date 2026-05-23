# Web UI

`apps/web` は reinfo の Web UI を担当します。

UI は Base UI と CSS Modules で実装します。

- Base UI: 挙動とアクセシビリティ
- CSS Modules: 見た目
- `src/styles`: design tokens と global styles

## ディレクトリ

コンポーネントはコンポーネント単位のフォルダにまとめます。

```text
src/
  components/
    Button/
      Button.tsx
      Button.module.css
      index.ts
      __tests__/
        Button.test.tsx
  layouts/
    AppShell/
      AppShell.tsx
      AppShell.module.css
      index.ts
      __tests__/
        AppShell.test.tsx
  styles/
    globals.css
    tokens.css
```

## 命名

- コンポーネントのフォルダ名とファイル名は PascalCase
- コンポーネント以外のフォルダ名とファイル名は kebab-case
- CSS Modules の class は kebab-case
- CSS custom properties は kebab-case
- TypeScript の変数と関数は camelCase
- React component と型は PascalCase

CSS Modules の kebab-case class は bracket access で参照します。

```tsx
import styles from "./Button.module.css";

export function Button() {
  return <button className={styles["primary-button"]}>調査する</button>;
}
```

## テスト

テストは対象階層の `__tests__` に置きます。

```text
Button/
  Button.tsx
  __tests__/
    Button.test.tsx
```

## バレルファイル

各コンポーネントフォルダに `index.ts` を置いてよいです。

```ts
export { Button } from "./Button";
export type { ButtonProps } from "./Button";
```

上位階層の大きな barrel file は、必要になるまで作りません。
