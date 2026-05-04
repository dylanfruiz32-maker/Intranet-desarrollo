import db from '../../db/index.js';

/** @typedef {import('./contact.schemas.js').Contact} Contact */

/**
 * Crea un contacto en la base de datos
 * @param {Object} payload
 * @param {Contact['name']} payload.name - El nombre del contacto
 * @param {Contact['phone']} payload.phone - El numero del contacto
 * @param {Contact['user_id']} payload.userId - El id del usuario que crea el contacto
 * @returns {Contact} El contacto creado
 */
const createContact = ({ name, phone, userId }) => {
  const createdContact = db
    .prepare(`INSERT INTO contacts (name, phone, user_id) VALUES (?, ?, ?) RETURNING *`)
    .get(name, phone, userId);
  return createdContact;
};

/**
 * Obtienes los contactos del usuario
 * @param {Contact['user_id']} userId - El id del usuario
 * @returns {Contact[]} Los contactos del usuario
 */
const getContacts = (userId) => {
  const contacts = db.prepare(`SELECT * FROM contacts WHERE user_id = ?`).all(userId);
  return contacts;
};

/**
 * Actualiza un contacto en la base de datos
 * @param {Object} payload
 * @param {Contact['id']} payload.id - El id del contacto
 * @param {Contact['name']} payload.name - El nombre del contacto
 * @param {Contact['phone']} payload.phone - El numero del contacto
 * @param {Contact['user_id']} payload.userId - El id del usuario que crea el contacto
 * @returns {Contact} El contacto actualizado
 */
const updateContact = ({ id, name, phone, userId }) => {
  const updatedContact = db
    .prepare(
      `
    UPDATE contacts
    SET name = ?, phone = ?
    WHERE id = ? AND user_id = ?
    RETURNING *
    `,
    )
    .get(name, phone, id, userId);
  return updatedContact;
};

/**
 * Elimina un contacto en la base de datos
 * @param {Object} payload
 * @param {Contact['id']} payload.id - El id del contacto
 * @param {Contact['user_id']} payload.userId - El id del usuario que crea el contacto
 * @returns {Contact} El contacto eliminado
 */
const deleteContact = ({ id, userId }) => {
  const deletedContact = db
    .prepare('DELETE FROM contacts WHERE id = ? AND user_id = ? RETURNING *')
    .get(id, userId);
  return deletedContact;
};

const contactRepository = { createContact, getContacts, updateContact, deleteContact };
export default contactRepository;
