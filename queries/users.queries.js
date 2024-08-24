const db = require("../db/db-config");

function createUser({ uid, username, bio, email, img_url }) {
	const query = `
        INSERT INTO users (uid, username, bio, email,img_url)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
	const values = [uid, username, bio, email];
	return db.one(query, values);
}
function getUserProfile(uid) {
	const query = `
        SELECT * FROM users
        WHERE uid = $1
    `;
	return db.oneOrNone(query, [uid]);
}

function updateUser(uid, { username, bio, email, img_url }) {
	const query = `
        UPDATE users
        SET username = $2, bio = $3, email = $4, img_url = $5
        WHERE uid = $1
        RETURNING *
    `;
	const values = [uid, username, bio, email, img_url];
	return db.one(query, values);
}
module.exports = {
	createUser,
	getUserProfile,
	updateUser,
};
