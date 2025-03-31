const db = require('./pool');

// using queries in this project for functions that interact directly with database outside of main flow

async function cleanTable() {
    await db.query("DELETE FROM users WHERE id = 1");
}

async function printTable() {
    const response  = await db.query("SELECT * FROM users");
    console.log(response.rows);
}

async function createMessagesTable() {
    await db.query("CREATE TABLE messages (id SERIAL PRIMARY KEY, user_id INT NOT NULL, message TEXT NOT NULL, time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);");
    const response = await db.query("SELECT * FROM messages");
    console.log(response.rows)
}

async function addColumnToMessagesTable() {
    await db.query("ALTER TABLE messages ADD first_name VARCHAR(255)");
    const response = await db.query("SELECT * FROM messages");
    console.log(response.rows)
};

async function cleanMessagesTable() {
    await db.query("DELETE FROM messages WHERE id > 0");
    const response = await db.query("SELECT * FROM messages");
    console.log(response.rows)
}

async function addAdminFieldToUsersTable() {
    // await db.query("ALTER TABLE users ADD is_admin BOOL DEFAULT false");
    const response = await db.query("SELECT * FROM users");
    console.log(response.rows);
}

