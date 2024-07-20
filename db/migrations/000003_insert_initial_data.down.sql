-- DECKSテーブルから初期データを削除
DELETE FROM DECKS WHERE deck_name IN ('My First Deck', 'うんこ単語帳');

-- USERSテーブルから初期データを削除
DELETE FROM USERS WHERE username = 'demo_user';
