import Database from 'better-sqlite3'

const db = new Database('user-data.db')

// Initialize the database and create tables if they don't exist
function initializeDatabase(): void {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `
  db.exec(createTableQuery)
}

// Insert a new user
function insertUser(name: string, email: string): Database.RunResult {
  const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)')
  return stmt.run(name, email)
}

// Get all users
function getAllUsers():
  | Array<{ id: number; name: string; email: string; created_at: string }>
  | unknown {
  const stmt = db.prepare('SELECT * FROM users')
  return stmt.all()
}

// Update a user
function updateUser(id: number, name: string, email: string): Database.RunResult {
  const stmt = db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?')
  return stmt.run(name, email, id)
}

// Delete a user
function deleteUser(id: number): Database.RunResult {
  const stmt = db.prepare('DELETE FROM users WHERE id = ?')
  return stmt.run(id)
}

// Initialize the database when the service is imported
initializeDatabase()

export { insertUser, getAllUsers, updateUser, deleteUser }
