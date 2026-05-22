# reinfo

`reinfo` は、戸建てを建てるための土地探しで、候補地の一次調査を短縮するためのツールです。

まずは候補地を 1 件入力し、その場所で暮らす・建てる・検討を進めるうえで確認したい情報をまとめます。
現地を見るか、仲介会社へ追加確認するか、保留するか、見送るかを判断する前段の調査を速くすることが最初の目的です。

## MVP

MVP は候補地 1 件の調査に絞ります。

### 入力

- 住所または緯度経度
- 販売価格
- 土地面積
- 物件 URL
- メモ

### 初期レポート

- 建築: 用途地域、建ぺい率、容積率、防火・準防火、追加確認が必要な都市計画情報
- 防災: 洪水、土砂、大規模盛土造成地、液状化、地域に応じた津波・高潮
- 暮らし: 小学校区、中学校区、保育施設、医療機関、公園、図書館、公共施設
- 人口: 候補地周辺の将来人口メッシュ
- 価格感: 販売坪単価、周辺の土地取引情報、近隣の地価公示・地価調査
- 地図: 候補地ピンと、調査レイヤーの切り替え表示

MVP は API の取得結果を並べるだけでなく、調査サマリーと追加確認メモを残せる状態を目指します。
公開データや API レスポンスは調査の入口であり、購入判断や建築可否の最終判断そのものにはしません。

## 技術スタック

Cloudflare をインフラの中心に置き、次の構成で進めます。

- Bun
- mise
- Oxc
- React
- Vite
- TypeScript
- Cloudflare Workers
- Hono
- Cloudflare D1
- Drizzle ORM
- MapLibre GL JS
- Zod
- Vitest
- Playwright

## リポジトリ構成

コードは Web、API、共有コードで分けます。
ただし Cloudflare へのデプロイ単位は最初は 1 つの Worker にまとめます。

```text
apps/
  web/            React + Vite の Web UI
  api/            Hono の Worker API
  wrangler.jsonc  Web assets と API entry を束ねる Cloudflare 設定
packages/
  shared/         Zod schema、ドメイン型、API 契約
```

ルートでは Bun workspaces、mise のツール管理とタスク実行、共通 TypeScript 設定を扱います。
`packages/shared` には、Web と API の両方で使う schema、型、ドメインロジックだけを置きます。
依存関係は `latest` を指定せず、各 `package.json` と `bun.lock` で固定します。

## デプロイ構成

初版は Cloudflare Worker を 1 つだけデプロイします。

- `apps/api` を Worker entry にする
- `apps/web` の build output を Static Assets として同じ Worker に載せる
- `/api/*` は Hono が処理する
- それ以外は Web UI を配信する

```text
Browser
  -> Web UI
  -> /api/*
      -> Hono Worker API
        -> 不動産情報ライブラリ API
        -> Cloudflare D1
```

ブラウザから不動産情報ライブラリ API を直接呼びません。
API キーは Cloudflare の Secret として Worker 側で扱います。

Worker API は次を担当します。

- 不動産情報ライブラリ API の呼び出し
- UI 向けのレスポンス整形
- 候補地の保存
- 調査レポートと API レスポンスのキャッシュ
- D1 への永続化

D1 には初期段階では候補地、メモ、調査結果、API キャッシュを保存します。
候補地 1 件の調査体験が役に立つ前に、大規模な空間分析基盤は作りません。

## 開発

必要なツールは mise で管理します。

```sh
mise install
mise run dev
```

開発サーバーは Cloudflare Vite plugin を通して Web UI と Worker API を一緒に起動します。
初期 API として `GET /api/health` を用意しています。

依存関係を入れ直すときは lockfile を使います。

```sh
mise run install
```

変更前後の確認は次でまとめて実行します。

```sh
mise run check
```

`check` は Oxfmt、Oxlint、TypeScript、Vitest、Cloudflare 用 build を順に確認します。

D1 の schema 変更では Drizzle の migration を生成します。

```sh
mise run db:generate
```

## 初期スコープ外

- 売り土地情報の自動収集
- 広域エリア探索や比較ダッシュボード
- 精密な査定や自動の購入推奨
- 保育の空き状況や入園難易度の推定
- 初日からの本格的な空間分析データベース
- 必要になる前の認証基盤

## タスク管理

MVP は [#1](https://github.com/wato787/reinfo/issues/1) から追跡します。
