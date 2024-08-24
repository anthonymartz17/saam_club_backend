\c saam_club_db;

-- Inserting data into the users table
INSERT INTO users (uid, username, bio, email,img_url) VALUES 
('scg6sMPLG9T9mWE5VyBVqDae1lw2', 'Antonio', 'Fullstack dev', 'amartinez@pursuit.org','https://ca.slack-edge.com/TCVA3PF24-U0640C4HB5L-313b764ada25-512'),
('hYYMm5LXqqfKKKpVaf6fEdIjrbq1', 'Abdel', '', 'asayedahmed@pursuit.org','https://ca.slack-edge.com/TCVA3PF24-U064KLDFYKB-1e41f20ca5e6-512'),
('9wcJUGxDiTZBgDYWRNYlu2tjhAr2', 'Marcus', '', 'mbrowne@pursuit.org','https://ca.slack-edge.com/TCVA3PF24-U063SFA1DN3-1f2158372ace-512');

-- Inserting data into the posts table
INSERT INTO posts (user_id, user_uid, content) VALUES
(1, 'user1_uid', 'This is my first post!'),
(2, 'user2_uid', 'Hello, world!'),
(3, 'user3_uid', 'This is my first blog post.');

-- Inserting data into the comments table
INSERT INTO comments (user_id, post_id, user_uid, parent_comment_id, content) VALUES
(1, 1, 'user1_uid', NULL, 'Great post!'),
(2, 1, 'user2_uid', NULL, 'I agree!'),
(3, 1, 'user3_uid', 1, 'Thanks!'),
(1, 2, 'user1_uid', NULL, 'Welcome to the community!'),
(2, 2, 'user2_uid', NULL, 'Nice to meet you!'),
(3, 2, 'user3_uid', 2, 'Glad to see you here!');

-- Inserting data into the likes table
INSERT INTO likes (user_id, post_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(1, 2),
(2, 2),
(3, 2);