INSERT INTO notes (guid, mid, `mod`, usn, tags, flds, sfld, csum, flags, data)
VALUES 
('new-guid-unique', 2, 1627912195, 2, 'new,tag', 'New Question Content,New Answer Content', 'New Question Content', 123456789, 0, 'New extra data for note');



INSERT INTO cards (nid, did, `ord`, `mod`, usn, `type`, queue, due, ivl, factor, reps, lapses, `left`, odue, odid, flags, data)
VALUES 
(5, 1, 0, 1627912195, 2, 0, 0, 1627913195, 0, 2.5, 0, 0, 0, 0, 0, 0, 'Card data for note 5 in deck 1');


