DROP DATABASE IF EXISTS snapflix;
CREATE DATABASE snapflix;

\c snapflix;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  password VARCHAR
);

CREATE TABLE videos (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  url VARCHAR,
  user_id INTEGER REFERENCES users
);

CREATE TABLE comments (
  ID SERIAL PRIMARY KEY,
  content VARCHAR,
  user_id INTEGER REFERENCES users,
  video_id INTEGER REFERENCES videos
);

INSERT INTO users(username, password) VALUES('jmina', 'f724385e404095441c3ba8bf245b6fa379ebfda063778b5d25c1e719705bc566');
INSERT INTO users(username, password) VALUES('michael', 'ead12c3f61913549686bbd1b338f1befe431ab12c02455f396da6093b4d5960d');
INSERT INTO users(username, password) VALUES('maurice', '2e87a3867a400d9331f43f768b6c79460a18149426da9a300d42d0f208199bd1');
INSERT INTO users(username, password) VALUES('johnny', '8077cb1df5e3c0f5c1ba144a61a2d0ce70ff7eef79858e50898994afdfcd3bb7');
INSERT INTO videos(user_id, title, url)
VALUES('1', 'My Cup of Tea', 'https://youtu.be/CMjKw2yIOq0');
INSERT INTO videos(user_id, title, url)
VALUES('2', 'Right Off the Bat', 'https://youtu.be/oxSyycb_MFU');
INSERT INTO videos(user_id, title, url)
VALUES('3', 'Roll With the Punches', 'https://youtu.be/ZbrdVhR97c4');
INSERT INTO videos(user_id, title, url)
VALUES('4', 'Every Cloud Has a Silver Lining', 'https://youtu.be/TOfDZh-4eAY');
INSERT INTO videos(user_id, title, url)
VALUES('2', 'Under Your Nose', 'https://youtu.be/zifspHbL0kE');
INSERT INTO comments(content, user_id, video_id)
VALUES('Messenger bag kitsch meggings hot chicken. Meh leggings typewriter, affogato mustache vegan beard raclette celiac raw denim cold-pressed kombucha echo park small batch tote bag. Tilde neutra af, glossier chicharrones cliche messenger bag. Wayfarers green juice skateboard gentrify tumeric kombucha jianbing flannel, meditation poke try-hard lomo yuccie. Cardigan microdosing tattooed literally coloring book succulents. Aesthetic kombucha unicorn, listicle typewriter trust fund literally humblebrag vinyl bushwick blog brunch quinoa vaporware roof party. Kickstarter meh tbh put a bird on it.', '2', '1');
INSERT INTO comments(content, user_id, video_id)
VALUES('Cronut shoreditch irony tattooed activated charcoal. Semiotics kickstarter unicorn, knausgaard schlitz literally freegan you probably havent heard of them mixtape. Offal kitsch celiac, small batch keytar iPhone listicle tote bag yuccie cray single-origin coffee green juice mustache direct trade. Subway tile cold-pressed prism deep v iceland organic tumeric lo-fi. Fixie tote bag la croix truffaut selvage cronut taxidermy pop-up, whatever poke banh mi wayfarers swag irony shabby chic. Put a bird on it man braid cred, ethical copper mug 8-bit 3 wolf moon listicle asymmetrical. Snackwave iPhone man bun, polaroid sartorial forage chia bushwick keytar celiac try-hard man braid leggings enamel pin.', '2', '1');
INSERT INTO comments(content, user_id, video_id)
VALUES('Shoreditch next level knausgaard wolf snackwave VHS tilde cardigan pour-over crucifix salvia. Ennui paleo small batch trust fund street art, mumblecore fashion axe forage tattooed squid keffiyeh you probably havent heard of them hell of echo park everyday carry. Literally jean shorts coloring book vape disrupt tousled locavore franzen, scenester vegan tumeric fap lumbersexual letterpress fam. Umami migas 3 wolf moon, raclette cornhole vice VHS. VHS cliche locavore, yuccie shabby chic post-ironic green juice brooklyn hexagon succulents af wolf. Everyday carry venmo keffiyeh schlitz, meggings fashion axe banh mi iceland tbh. Offal XOXO fanny pack, humblebrag af lumbersexual VHS.', '1', '2');
INSERT INTO comments(content, user_id, video_id)
VALUES('Bicycle rights tilde edison bulb direct trade, scenester chia la croix paleo. Cardigan chia cred, poke dreamcatcher woke next level post-ironic meditation master cleanse celiac polaroid slow-carb letterpress. Meggings knausgaard brooklyn lumbersexual, poke typewriter small batch chicharrones whatever man braid. Cold-pressed kombucha slow-carb, health goth forage etsy affogato PBR&B. Quinoa drinking vinegar cardigan, 90s freegan coloring book pop-up sriracha trust fund artisan kogi wolf chartreuse. Scenester gochujang retro, tacos small batch cronut YOLO enamel pin vaporware activated charcoal hexagon. Waistcoat messenger bag tousled everyday carry, jianbing pitchfork cray readymade.', '3', '3');
INSERT INTO comments(content, user_id, video_id)
VALUES('Squid kogi godard, hammock organic jianbing blue bottle williamsburg artisan photo booth kombucha tumeric snackwave echo park vexillologist. Tumblr cornhole salvia listicle. Readymade portland pinterest cred. Franzen farm-to-table aesthetic, mlkshk godard venmo blog chambray ethical vape. Hammock austin pop-up green juice trust fund brooklyn. Jean shorts sustainable portland, semiotics chambray kinfolk activated charcoal enamel pin poutine bicycle rights. Letterpress four dollar toast organic stumptown, la croix neutra biodiesel waistcoat pork belly.', '4', '5');
