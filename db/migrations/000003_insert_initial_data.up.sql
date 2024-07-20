-- USERSテーブルに初期データを挿入
INSERT INTO USERS (username, email, password) VALUES ('demo_user', 'demo@example.com', 'password123');

-- DECKSテーブルに初期データを挿入
INSERT INTO DECKS (user_id, deck_name) VALUES (1, 'My First Deck');
INSERT INTO DECKS (user_id, deck_name) VALUES (1, 'うんこ単語帳');
