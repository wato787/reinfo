# Web UI

`apps/web` は reinfo の Web UI を担当します。

UI は Base UI と CSS Modules で実装します。

- Base UI: 挙動とアクセシビリティ
- CSS Modules: 見た目
- `src/styles`: design tokens と global styles

## ディレクトリ

画面単位のコードは `views` に置きます。
その画面でしか使わない小さな部品は view のフォルダにコロケーションします。
複数の view で使う部品だけを `components` に置きます。

```text
src/
  views/
    Scaffold/
      Scaffold.tsx
      Scaffold.module.css
      HealthStatus.tsx
      __tests__/
        Scaffold.test.tsx
  components/
    Button/
      Button.tsx
      Button.module.css
      index.ts
      __tests__/
        Button.test.tsx
    Field/
      Field.tsx
      Field.module.css
      index.ts
      __tests__/
        Field.test.tsx
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

## フォーム

フォーム入力は `Field` の composition と入力 primitive を組み合わせます。

```tsx
<Field>
  <FieldLabel>緯度</FieldLabel>
  <Input inputMode="decimal" />
  <FieldDescription>候補地の緯度を入力します</FieldDescription>
</Field>
```

- `Field`: label、description、error の表示とアクセシビリティの紐付け
- `FieldLabel`: 入力のラベル
- `FieldDescription`: 補助説明
- `FieldError`: エラー表示
- `Input`: 1 行入力
- `Textarea`: 複数行入力
