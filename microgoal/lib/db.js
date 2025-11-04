// db.js
import * as SQLite from 'expo-sqlite';

// open or create the database
const db = SQLite.openDatabaseSync('goals.db');

// Initialize tables
export const initDB = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS goals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      status TEXT CHECK(status IN ('active', 'completed', 'failed')) DEFAULT 'active',
      start_time INTEGER,
      end_time INTEGER,
      total_minutes INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('✅ Database initialized');
};

export default db;
