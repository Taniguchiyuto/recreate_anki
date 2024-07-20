CREATE DATABASE IF NOT EXISTS anki_db;
USE anki_db;

CREATE TABLE IF NOT EXISTS USERS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS DECKS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    deck_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

CREATE TABLE IF NOT EXISTS NOTES (
    id INT AUTO_INCREMENT PRIMARY KEY,
    guid VARCHAR(255),
    mid INT,
    `mod` INT,
    usn INT,
    tags TEXT,
    flds TEXT,
    sfld TEXT,
    csum INT,
    flags INT,
    data TEXT
);

CREATE TABLE IF NOT EXISTS CARDS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nid INT,
    did INT,
    ord INT,
    `mod` INT,
    usn INT,
    type INT,
    queue INT,
    due INT,
    ivl INT,
    factor INT,
    reps INT,
    lapses INT,
    `left` INT,
    odue INT,
    odid INT,
    flags INT,
    data TEXT,
    FOREIGN KEY (nid) REFERENCES NOTES(id),
    FOREIGN KEY (did) REFERENCES DECKS(id)
);

CREATE TABLE IF NOT EXISTS REVLOG (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cid INT,
    usn INT,
    ease INT,
    ivl INT,
    lastIvl INT,
    factor INT,
    time INT,
    type INT,
    FOREIGN KEY (cid) REFERENCES CARDS(id)
);

CREATE TABLE IF NOT EXISTS COL (
    id INT AUTO_INCREMENT PRIMARY KEY,
    crt INT,
    `mod` INT,
    scm INT,
    ver INT,
    dty INT,
    usn INT,
    ls INT,
    conf TEXT,
    models TEXT,
    decks TEXT,
    dconf TEXT,
    tags TEXT
);
