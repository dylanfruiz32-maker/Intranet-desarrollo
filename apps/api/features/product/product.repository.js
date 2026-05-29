import db from '../../db/index.js';

/** @typedef {import('./product.schemas.js').Product} Product */

/**
 *  Crea un producto en la base de datos
 * @param {Object} payload
 * @param {Product['userId']} payload.userId - El id del usuario
 * @param {Product['category_id']} payload.category_id - El id de la categoría del producto
 * @param {Product['name']} payload.name - El nombre del producto
 * @param {Product['sku']} payload.sku - El SKU del producto
 * @param {Product['price']} payload.price - El precio del producto
 * @param {Product['cost']} payload.cost - El costo del producto
 * @param {Product['current_stock']} payload.current_stock - El stock actual del producto
 * @param {Product['minimum_stock']} payload.minimum_stock - El stock mínimo del producto
 * @returns {Product} - El producto creado
*/
const createProduct = async ({userId, category_id, name, sku, price, cost, current_stock , minimum_stock }) => {
  const res = await db.query(
    `
    INSERT INTO products (user_id, category_id, name, sku, price, cost, current_stock, minimum_stock)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `, 
    [userId, category_id, name, sku, price, cost, current_stock, minimum_stock]
  );
  const createdProduct = res.rows[0];
  return createdProduct;
};

/**
 * Obtiene los productos de un usuario
 * @param {Product['userId']} userId - El id del usuario
 * @return {Product[]} - Los productos del usuario
 */
const getProducts = async (userId) => {
  const res = await db.query(
    `
    SELECT * FROM products
    WHERE user_id = $1 AND deleted_at IS NULL
  `, 
    [userId]
  );
  const products = res.rows;
  return products;
};

/**
 *  Actualiza un producto en la base de datos
 * @param {Object} payload
 * @param {Product['userId']} payload.userId - El id del usuario
 * @param {Product['category_id']} payload.category_id - El id de la categoría del producto
 * @param {Product['name']} payload.name - El nombre del producto
 * @param {Product['sku']} payload.sku - El SKU del producto
 * @param {Product['price']} payload.price - El precio del producto
 * @param {Product['cost']} payload.cost - El costo del producto
 * @param {Product['current_stock']} payload.current_stock - El stock actual del producto
 * @param {Product['minimum_stock']} payload.minimum_stock - El stock mínimo del producto
 * @param {Product['id']} payload.id - El ID del producto
 * @returns {Product} - El producto actualizado
*/
const updateProduct = async ({ userId,category_id, name, sku, price, cost, current_stock, minimum_stock, id }) => {
  const res = await db.query(
    `
    UPDATE products
    SET name = $1, sku = $2, price = $3, cost = $4, current_stock = $5, minimum_stock = $6, category_id = $7
    WHERE id = $8 AND user_id = $9 AND deleted_at IS NULL
    RETURNING *
  `,
    [name, sku, price, cost, current_stock , minimum_stock, category_id, id, userId]
  );
  const updatedProduct = res.rows[0] || null;
  return updatedProduct;
};

/**
 * Elimina un producto de la base de datos
 * @param {Product['id']} id - El id del producto
 * @param {Product['userId']} userId - El id del usuario
 * @return {Product} - El producto eliminado
 */
const softDeleteProduct = async ({ id, userId }) => {
  const res = await db.query(
    `
    UPDATE products
    SET deleted_at = NOW()
    WHERE id = $1 AND user_id = $2 AND deleted_at IS NULL
    RETURNING *
  `,
    [id, userId]
  );
  const deletedProduct = res.rows[0] || null;
  return deletedProduct;
};

const productRepository = {
    createProduct,
    getProducts,
    updateProduct,
    softDeleteProduct,
};

export default productRepository;
