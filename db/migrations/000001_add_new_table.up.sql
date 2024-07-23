CREATE TABLE IF NOT EXISTS USERS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS CARDS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nid INT,
    did INT,
    ord INT,
    mod INT,
    usn INT,
    type INT,
    queue INT,
    due INT,
    ivl INT,
    factor INT,
    reps INT,
    lapses INT,
    left INT,
    odue INT,
    odid INT,
    flags INT,
    data TEXT,
    FOREIGN KEY (nid) REFERENCES NOTES(id),
    FOREIGN KEY (did) REFERENCES DECKS(id)
);

CREATE TABLE IF NOT EXISTS NOTES (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guid VARCHAR(255),
    mid INT,
    mod INT,
    usn INT,
    tags TEXT,
    flds TEXT,  -- 実際の質問や答えのフィールド
    sfld VARCHAR(255),
    csum INT,
    flags INT,
    data TEXT
);