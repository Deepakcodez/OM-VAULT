import Database from 'better-sqlite3'

// Create or open a single database file
const db: Database.Database = new Database('database.db')

// Create Tables for Different Entities

// Purchases Table
db.exec(`
  CREATE TABLE IF NOT EXISTS purchases (
    id TEXT PRIMARY KEY,
    productName TEXT NOT NULL,
    price REAL,
    quantity INTEGER,
    discount REAL,
    tax REAL,
    supplier TEXT,
    supplierContact TEXT,
    supplierEmail TEXT,
    supplierAddress TEXT,
    shippingAddress TEXT,
    paymentStatus TEXT,
    paymentMethod TEXT,
    orderingDate TEXT,
    isInstallment INTEGER,
    installments TEXT,
    pending REAL,
    totalPrice REAL
  )

`)

//sales
db.exec(`
  CREATE TABLE IF NOT EXISTS sales (
    id TEXT PRIMARY KEY,
    productName TEXT NOT NULL,
    price REAL,
    quantity INTEGER,
    discount REAL,
    tax REAL,
    supplier TEXT,
    supplierContact TEXT,
    supplierEmail TEXT,
    supplierAddress TEXT,
    shippingAddress TEXT,
    paymentStatus TEXT,
    paymentMethod TEXT,
    orderingDate TEXT,
    isInstallment INTEGER,
    installments TEXT,
    pending REAL,
    totalPrice REAL
  )

`)

// Users Table
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone INTEGER NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`)

export default db
