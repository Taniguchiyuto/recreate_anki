-- USERSテーブルに初期データを挿入
INSERT INTO USERS (username, email, password) VALUES ('demo_user', 'demo@example.com', 'password123');

-- DECKSテーブルに初期データを挿入
INSERT INTO DECKS (user_id, deck_name) VALUES (1, 'My First Deck');
INSERT INTO DECKS (user_id, deck_name) VALUES (1, 'うんこ単語帳');

INSERT INTO notes (guid, mid, `mod`, usn, tags, flds, sfld, csum, flags, data)
VALUES
(
    'unique-guid-12345',  -- GUID
    1,  -- モデルID
    UNIX_TIMESTAMP(),  -- 最終更新時刻
    0,  -- ユーザーシーケンス番号
    '', -- タグ
    'What is the capital of France?\x1fParis',  -- フィールド（質問と答え）
    'What is the capital of France?',  -- 検索フィールド
    1234567890,  -- チェックサム
    0,  -- フラグ
    ''  -- その他データ
);

SET @last_note_id = LAST_INSERT_ID();

INSERT INTO cards (
    nid,  -- ノートID
    did,  -- デッキID
    ord,  -- 順序
    `mod`,  -- 最終更新時刻（現在時刻）
    usn,  -- ユーザーシーケンス番号
    `type`, -- カードタイプ
    queue,-- キュー
    due,  -- 期日
    ivl,  -- インターバル
    factor,-- 因子
    reps, -- 繰り返し回数
    lapses,-- ラプス数
    `left`, -- 残り
    odue, -- オリジナル期日
    odid, -- オリジナルデッキID
    flags,-- フラグ
    data  -- その他データ
)
VALUES
(
    @last_note_id,  -- ノートID
    1,  -- デッキID
    0,  -- 順序
    UNIX_TIMESTAMP(),  -- 最終更新時刻（現在時刻）
    0,  -- ユーザーシーケンス番号
    0,  -- カードタイプ
    0,  -- キュー
    UNIX_TIMESTAMP() + 86400, -- 期日（現在時刻 + 1日）
    1,  -- インターバル
    2500, -- 因子
    0,  -- 繰り返し回数
    0,  -- ラプス数
    0,  -- 残り
    0,  -- オリジナル期日
    0,  -- オリジナルデッキID
    0,  -- フラグ
    ''  -- その他データ
);
