import db from './index.js';

/**
 * Crea la tabla de usuarios en la base de datos
 * @returns {void}
 */
const createUsersTable = async () => {
  const statement = db.prepare(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      department TEXT NOT NULL,
      email_verified BOOLEAN DEFAULT false
    )
  `);
  statement.run();
  console.log('Tabla de usuarios creada!');
};

/**
 * Crea la tabla de contactos en la base de datos
 * @returns {void}
 */
const createContactsTable = async () => {
  const statement = db.prepare(`
    CREATE TABLE contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  statement.run();
  console.log('Tabla de contactos creada!');
};

/**
 * Crea la tabla de sesiones en la base de datos
 * @returns {void}
 */
const createSessionTable = async () => {
  const statement = db.prepare(`
    CREATE TABLE sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jwtid TEXT UNIQUE NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  statement.run();
  console.log('Tabla de sesiones creada!');
};

/**
 * Elimina las tablas de la base de datos para reiniciar el estado de la base de datos
 * @returns {void}
 */
const resetDb = async () => {
  db.prepare('DROP TABLE IF EXISTS contacts').run();
  db.prepare('DROP TABLE IF EXISTS sessions').run();
  db.prepare('DROP TABLE IF EXISTS users').run();
  console.log('Tablas eliminadas');
};

/**
 * Crea las tablas de la base de datos
 * @returns {void}
 * @description Esta función se encarga de crear las tablas de la base de datos, primero elimina las tablas existentes para evitar errores de tablas ya existentes, luego crea las tablas necesarias para la aplicación.
 */
export const createTables = async () => {
  await resetDb();
  await createUsersTable();
  await createContactsTable();
  await createSessionTable();
  console.log('Tablas creadas');
};

createTables();