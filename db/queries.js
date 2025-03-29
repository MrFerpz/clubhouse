const db = require('./pool');

// async function dbCheck() {
//     try {
//         await db.query("INSERT INTO users (first_name, last_name, email, password, is_member) VALUES ('Fred', 'Yates', 'fred@gmail.com', 'password', true)");
//         console.log('successfully added user');
//         const response = await db.query('SELECT * FROM users');
//         console.log(response.rows);
//     }
//     catch(err) {
//         console.log(err)
//     }
// }


