INSERT INTO models (`name`, `flds`, `tmpl`, `css`, `mod`, `usn`, `type`, `vers`, `did`, `conf`)
VALUES (
    'Basic Card Model', 
    '[{"name":"Front","ord":0,"sticky":false},{"name":"Back","ord":1,"sticky":false}]', 
    '[{"name":"Card 1","qfmt":"{{Front}}","afmt":"{{FrontSide}}<hr>{{Back}}"}]', 
    '.card { font-family: Arial; font-size: 20px; color: black; background-color: white; }', 
    UNIX_TIMESTAMP(),  -- UNIXタイムスタンプを取得
    -1, 
    0, 
    '1', 
    1, 
    '{"autoplay":true,"new":{"delays":[1, 10],"initialFactor":2500,"separate":true,"order":1,"perDay":20},"lapse":{"delays":[10],"mult":0.95,"minInt":1},"rev":{"perDay":100,"ease4":1.3,"fuzz":0.05,"maxIvl":36500,"minSpace":1,"ivlFct":1}}'
);
