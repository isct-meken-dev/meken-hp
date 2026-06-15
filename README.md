# meken-HMtest

アニメーション研究会のホームページ制作プロジェクトです。  
引き継ぎ資料が不足している前提で、静的サイトとして一から構築しています。
[現HP](https://animeken.org/)
[前HP](http://titans-animeken.com/)

以下のような記事を目標にしています。
https://www.mappa.co.jp/
https://st-kai.jp/
https://vll.jp/
https://wafl.jp/

## 更新事項
・習作の投稿
・ブログの投稿
## 概要

- 技術構成: HTML / CSS / JavaScript
- 目的: HMページの基盤の作成
- 公開想定: 静的ホスティング

## ディレクトリ構成

```text
meken-HMtest/
├── index.html
├── README.md
└── asset/
	├── css/
	│   ├── sanitize.css
	│   └── style.css
	├── images/
	└── js/
		└── app.js
```

## セットアップ

依存パッケージはありません。以下のどちらかで表示確認できます。

1. ブラウザで直接開く

- `index.html` をブラウザで開く

2. ローカルサーバーで開く（推奨）

```bash
cd meken-HMtest
python3 -m http.server 8000
```

起動後に以下へアクセス:

- `http://localhost:8000`

## テスト方法

自動テスト環境は未導入のため、現状は手動確認を行います。

### 1. 表示テスト

- PC幅でレイアウトが崩れていない
- About / Feature / Blog の各セクションが表示される
- 画像が表示される（ローカル画像とダミー画像）

### 2. 動作テスト

- Blogカードのリンクをクリックして遷移できる
- ホバー時のスタイル変化が反映される
- コンソールにエラーが出ていない（DevTools）

### 3. 変更時の回帰確認

- `asset/css/style.css` を変更した場合: 全セクションの余白・文字サイズ・カード表示を再確認
- `index.html` を変更した場合: リンク切れ、画像パス、クラス名のタイポを確認

## 開発メモ

- クラス名や属性名のタイポ（例: `class`, `href`）は表示崩れやリンク不良の原因になるため、変更時は優先確認する
- 将来的には、HTMLバリデーションとリンクチェックの自動化を導入予定
