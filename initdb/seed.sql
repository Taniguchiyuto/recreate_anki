-- seed.sql

USE anki_db;

-- USERSテーブルにデータを挿入
INSERT INTO USERS (username, email, password) VALUES ('demo_user', 'demo@example.com', 'password123');

-- DECKSテーブルにデータを挿入
INSERT INTO DECKS (user_id, deck_name) VALUES (1, 'My First Deck');
INSERT INTO DECKS (user_id, deck_name) VALUES (1, 'ここ');

INSERT INTO DECKS (user_id, deck_name) VALUES (1, 'devk');

-- その他のテーブルに必要な初期データを挿入
