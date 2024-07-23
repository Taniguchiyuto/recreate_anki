-- DECKSテーブルから初期データを削除
DELETE FROM DECKS WHERE deck_name IN ('My First Deck', 'うんこ単語帳');

-- USERSテーブルから初期データを削除
DELETE FROM USERS WHERE username = 'demo_user';

-- cardsテーブルから初期データを削除
DELETE FROM cards WHERE nid IN (SELECT id FROM notes WHERE guid = 'unique-guid-12345');

-- notesテーブルから初期データを削除
DELETE FROM notes WHERE guid = 'unique-guid-12345';
