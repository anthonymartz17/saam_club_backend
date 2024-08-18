\c saam_club_db;

-- Inserting data into the users table
INSERT INTO users (uid, username, bio, email) VALUES 
('dasfsagg', 'JohnDoe', 'ffeqfqwfq', 'john.doe@example.com'),
('hjyrjeh', 'JaneSmith', 'fwqefwqf', 'jane.smith@example.com'),
('efqfeqrqg', 'BobJohnson', 'fwqfqwfwqffq', 'bob.johnson@example.com');

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