CREATE TABLE models (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name TEXT,
    flds TEXT,  -- フィールド定義
    tmpl TEXT,  -- テンプレート定義
    css TEXT,   -- CSSスタイリング
    `mod` INTEGER,  -- バックティックで囲む
    usn INTEGER,
    `type` INTEGER,  -- バックティックで囲む
    vers TEXT,  -- バージョン情報
    did INTEGER,  -- デフォルトのデッキID
    conf TEXT
);



