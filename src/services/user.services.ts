import Database from 'better-sqlite3';
import db from './database.table';

// User Type Definition
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  created_at?: string;
}

// Insert a new user
function insertUser(userData: Omit<User, 'id' | 'created_at'>): Database.RunResult | null {
  try {
    const stmt = db.prepare(
      'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)'
    );
    return stmt.run(userData.name, userData.email, userData.phone, userData.password);
  } catch (error) {
    console.error('Error inserting user:', error);
    return null;
  }
}

// Get user by email
function getUserByEmail(email: string): User | null {
  try {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as User | null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

// Get all users
function getAllUsers(): User[] {
  try {
    const stmt = db.prepare(
      'SELECT id, name, email, phone, password, created_at FROM users'
    );
    return stmt.all() as User[];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

// Update a user
function updateUser(id: number, name: string, email: string): Database.RunResult | null {
  try {
    const stmt = db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?');
    return stmt.run(name, email, id);
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}

// Delete a user
function deleteUser(id: number): Database.RunResult | null {
  try {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    return stmt.run(id);
  } catch (error) {
    console.error('Error deleting user:', error);
    return null;
  }
}

// Export functions
export { insertUser, getUserByEmail, getAllUsers, updateUser, deleteUser };
