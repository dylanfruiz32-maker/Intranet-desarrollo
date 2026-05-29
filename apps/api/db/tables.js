import db from './index.js';

/**
 * Crea la tabla de usuarios en la base de datos
 * @returns {void}
 */
const createUsersTable = async () => {
  await db.query(`
    CREATE TABLE users (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      email_verified BOOLEAN DEFAULT false
    )
  `);
  console.log('Tabla de usuarios creada!');
};

/**
 * Crea la tabla de contactos en la base de datos
 * @returns {void}
 */
const createContactsTable = async () => {
await db.query(`
    CREATE TABLE contacts (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  console.log('Tabla de contactos creada!');
};

/**
 * Crea la tabla de sesiones en la base de datos
 * @returns {void}
 */
const createSessionTable = async () => {
await db.query(`
    CREATE TABLE sessions (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      jwtid TEXT UNIQUE NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  console.log('Tabla de sesiones creada!');
};

/**
 * Crea la tabla de productos en la base de datos
 * @returns {void}
 */
const createProductsTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
      name TEXT NOT NULL,
      sku TEXT NOT NULL,
      price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
      cost DECIMAL(10,2) NOT NULL CHECK (cost >= 0),
      current_stock INTEGER NOT NULL DEFAULT 0,
      minimum_stock INTEGER NOT NULL DEFAULT 5,
      deleted_at TIMESTAMP WITH TIME ZONE,
      UNIQUE (user_id, sku)
    );
  `);
  console.log('Tabla de productos creada!');
};

/**
 * Elimina las tablas de la base de datos para reiniciar el estado de la base de datos
 * @returns {void}
 */
const resetDb = async () => {
  await db.query('DROP TABLE IF EXISTS contacts');
  await db.query('DROP TABLE IF EXISTS sessions');
  await db.query('DROP TABLE IF EXISTS users');
  console.log('Tablas eliminadas');
};

/**
 * Crea las tablas de la base de datos
 * @returns {void}
 * @description Esta función se encarga de crear las tablas de la base de datos, primero elimina las tablas existentes para evitar errores de tablas ya existentes, luego crea las tablas necesarias para la aplicación.
 */
export const createTables = async () => {
  await db.connect();

  await resetDb();
  await createUsersTable();
  await createContactsTable();
  await createSessionTable();
  await createProductsTable();

  await db.end();
  process.exit(1);
  console.log('Tablas creadas');
};

createTables();