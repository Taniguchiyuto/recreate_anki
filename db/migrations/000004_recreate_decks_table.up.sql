-- NOTESテーブルを作成
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guid VARCHAR(255) NOT NULL,
    mid INT NOT NULL,
    `mod` INT NOT NULL,  -- 'mod'は予約語のためバッククォートで囲む
    usn INT NOT NULL,
    tags TEXT,
    flds TEXT,
    sfld TEXT,
    csum INT NOT NULL,
    flags INT,
    data TEXT
);

-- CARDSテーブルを作成
CREATE TABLE cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nid INT NOT NULL,
    did INT NOT NULL,
    `ord` INT NOT NULL,  -- 'ord'は予約語のためバッククォートで囲む
    `mod` INT NOT NULL,  -- 'mod'は予約語のためバッククォートで囲む
    usn INT NOT NULL,
    `type` INT NOT NULL,  -- 'type'は予約語のためバッククォートで囲む
    queue INT NOT NULL,
    due INT NOT NULL,
    ivl  FLOAT,
    factor FLOAT,
    reps INT,
    lapses INT,
    `left` INT,  -- 'left'は予約語のためバッククォートで囲む
    odue INT,
    odid INT,
    flags INT,
    data TEXT,
    FOREIGN KEY (nid) REFERENCES notes(id),
    FOREIGN KEY (did) REFERENCES decks(id)
);
