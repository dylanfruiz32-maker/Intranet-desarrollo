import db from '../../db/index.js';

/** @typedef {import('./category.schemas.js').Category} Category */
/** @typedef {import('./category.schemas.js').CategoryAttribute} CategoryAttribute */

/**
 * Crea una categoría en la base de datos
 * @param {Object} payload
 * @param {string} payload.name - Nombre de la categoría
 * @param {number} payload.userId - El id del usuario
 * @returns {Category} La categoría creada 
 */
const createCategory = async ({ name, userId }) => {
  const res = await db.query(
    `
    INSERT INTO categories (name, user_id)
    VALUES ($1, $2) RETURNING *
  `,
    [name, userId]
  );
  const createdCategory = res.rows[0];
  return createdCategory;
};

/**
 * Obtiene todas las categorías de un usuario 
 * @param {number} userId - El id del usuario
 * @returns {Category[]} Las categorías encontradas
 */
const getCategories = async (userId) => {
  const res = await db.query(
    `
    SELECT * FROM categories WHERE user_id = $1 AND deleted_at IS NULL
  `,
    [userId]
  );
  const categories = res.rows;
  return categories;
};

/**
 * Actualiza el nombre de una categoría
 * @param {Object} payload
 * @param {number} payload.id - El id de la categoría
 * @param {string} payload.name - El nuevo nombre
 * @param {number} payload.userId - El id del usuario dueño
 * @returns {Category|null} La categoría actualizada o null
 */
const updateCategory = async ({ id, name, userId }) => {
  const res = await db.query(
    `
    UPDATE categories
    SET name = $1
    WHERE id = $2 AND user_id = $3 AND deleted_at IS NULL
    RETURNING *
  `,
    [name, id, userId]
  );
  const updatedCategory = res.rows[0] || null;
  return updatedCategory;
};

/**
 * Elimina una Categoría en la base de datos por su id
 * @param {number} id - El id de la categoría a eliminar
 * @param {number} userId - El id del usuario dueño de la categoría
 * @returns {Promise<Category|null>} La categoría eliminada o null
 */
const deleteCategoryById = async (id, userId) => {
  const res = await db.query(
    `
    UPDATE categories
    SET deleted_at = NOW()
    WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL
    RETURNING *
  `,
    [id, userId]
  );
  const deletedCategory = res.rows[0] || null;
  return deletedCategory;
};

/**
 * Crea una atributo para una categoría
 * @param {Object} payload
 * @param {number} payload.categoryId - id de la categoría a la que pertenece
 * @param {string} payload.name - Nombre del atributo (Ej: 'Talla')
 * @returns {CategoryAttribute} El atributo creado
 */
const createAttribute = async ({ category_id, name }) => {
  const res = await db.query(
    `
    INSERT INTO category_attributes (category_id, name )
    VALUES ($1, $2) RETURNING *
  `,
    [category_id, name],
  );
  const createdAttribute = res.rows[0];
  return createdAttribute;
};

/**
 * Actualiza el nombre de un atributo de una categoría
 * @param {Object} payload
 * @param {number} payload.id - id del atributo
 * @param {string} payload.name - Nuevo nombre del atributo
 * @returns {CategoryAttribute|null} El atributo modificado
 */
const updateAttribute = async ({ id, name }) => {
  const res = await db.query(
    `
    UPDATE category_attributes
    SET name = $1
    WHERE id = $2 AND deleted_at IS NULL
    RETURNING *
  `,
    [name, id]
  );
  const updatedAttribute = res.rows[0] || null;
  return updatedAttribute;
};

/**
 * Elimina un atributo de categoría de la base de datos
 * @param {number} id - El id del atributo a eliminar
 * @returns {Promise<CategoryAttribute|null>} El atributo eliminado
 */
const deleteAttributeById = async (id) => {
  const res = await db.query(
    `
    UPDATE category_attributes
    SET deleted_at = NOW() 
    WHERE id = $1 AND deleted_at IS NULL 
    RETURNING *
  `, 
    [id]
  );
  const deletedAttribute = res.rows[0] || null;
  return deletedAttribute;
};

const categoryRepository = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategoryById,
  createAttribute,
  updateAttribute,
  deleteAttributeById,
};

export default categoryRepository;