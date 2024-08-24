const db = require('../db');

function createUser(uid, username, bio, email,img_url) {
    const query = `
        INSERT INTO users (uid, username, bio, email,img_url)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const values = [uid, username, bio, email];
    return db.one(query, values);
} 