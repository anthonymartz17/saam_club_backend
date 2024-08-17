\c saam_club_db;

INSERT INTO users (username, email) VALUES 
('JohnDoe', 'john.doe@example.com'),
('JaneSmith', 'jane.smith@example.com'),
('BobJohnson', 'bob.johnson@example.com');

INSERT INTO posts (user_id, title, content) VALUES
(1, 'First Post', 'This is my first post!'),
(2, 'Hello World', 'Hello, world!'),
(3, 'My First Blog Post', 'This is my first blog post.');

INSERT INTO comments (user_id, posts_id, parent_id, content) VALUES
(1, 1, NULL, 'Great post!'),
(2, 1, NULL, 'I agree!'),
(3, 1, 1, 'Thanks!'),
(1, 2, NULL, 'Welcome to the community!'),
(2, 2, NULL, 'Nice to meet you!'),
(3, 2, 2, 'Glad to see you here!');

INSERT INTO likes (user_id, posts_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(1, 2),
(2, 2),
(3, 2);