-- `cards`テーブルから指定されたデータを削除
DELETE FROM cards 
WHERE nid = 1 AND did = 1 AND `ord` = 0 AND `mod` = 0 AND usn = 0 AND `type` = 0 AND queue = 0 
      AND due = 1627824000 AND ivl = 1 AND factor = 2500 AND reps = 1 AND lapses = 0 AND `left` = 0 
      AND odue = 0 AND odid = 0 AND flags = 0 AND data = 'Example card data 1';

DELETE FROM cards 
WHERE nid = 2 AND did = 2 AND `ord` = 1 AND `mod` = 1 AND usn = 1 AND `type` = 1 AND queue = 1 
      AND due = 1627910400 AND ivl = 2 AND factor = 2000 AND reps = 2 AND lapses = 1 AND `left` = 1 
      AND odue = 0 AND odid = 0 AND flags = 0 AND data = 'Example card data 2';
