INSERT INTO notes (guid, mid, `mod`, usn, tags, flds, sfld, csum, flags, data)
VALUES 
('guid-12345', 1, 0, 0, 'tag1,tag2', 'field1 content', 'field2 content', 1234567890, 0, 'some data'),
('guid-67890', 2, 0, 1, 'tag3', 'another field content', 'another field2 content', 9876543210, 0, 'more data');

INSERT INTO cards (nid, did, `ord`, `mod`, usn, `type`, queue, due, ivl, factor, reps, lapses, `left`, odue, odid, flags, data)
VALUES 
(1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'card data 1'),
(2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'card data 2');
