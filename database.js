// database.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./profile.db', (err) => {
    if (err) {
        return console.error(">> DATABASE CONNECTION FAILED: " + err.message);
    }
    console.log("// Database connection established.");

    const createTableSql = `
    CREATE TABLE IF NOT EXISTS programs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT
    )`;

    db.run(createTableSql, (err) => {
        if (err) {
            return console.error(">> TABLE CREATION FAILED: " + err.message);
        }

        db.all("SELECT * FROM programs", [], (err, rows) => {
            if (err) {
                return console.error(">> TABLE READ FAILED: " + err.message);
            }

            if (rows.length === 0) {
                console.log("// Table empty. Seeding with initial data packets...");
                const programsData = [
                    { title: 'NEURAL_INTERFACE', description: 'Direct-to-brain learning modules for accelerated skill acquisition.', image_url: 'https://picsum.photos/400/250?random=10' },
                    { title: 'COMBAT_SIMULATION', description: 'Virtual reality training grounds to test skills against rogue AIs.', image_url: 'https://picsum.photos/400/250?random=11' },
                    { title: 'BLACK_ICE_DEFENSE', description: 'Master the art of cybersecurity and protect critical data from unauthorized access.', image_url: 'https://picsum.photos/400/250?random=12' },
                    { title: 'HARDWARE_ENGINEERING', description: 'Build and modify cybernetics, drones, and custom hardware from scratch.', image_url: 'https://picsum.photos/400/250?random=13' }
                ];

                const stmt = db.prepare("INSERT INTO programs (title, description, image_url) VALUES (?, ?, ?)");
                programsData.forEach(p => {
                    stmt.run(p.title, p.description, p.image_url);
                });
                stmt.finalize();
                console.log("// Seed data successfully injected.");
            } else {
                console.log("// Table already contains data.");
            }
        });
    });
});

module.exports = db;