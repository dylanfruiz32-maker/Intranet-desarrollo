import { Router } from 'express';
import {
  createCategoryRouteSchema,
  updateCategoryRouteSchema,
  deleteCategoryRouteSchema,
  createCategoryAttributeRouteSchema,
  updateCategoryAttributeRouteSchema,
  deleteCategoryAttributeRouteSchema,
} from './category.routes.schemas.js';
import categoryRepository from './category.repository.js';
const categoryRouter = Router();

//Ruta para crear una categoria
categoryRouter.post('/', async (req, res) => {
  //1. Validar el requerimiento
  const body = createCategoryRouteSchema.body.parse(req.body);

  //2.Guardarlo en db
  const createdCategory = await categoryRepository.createCategory({
    name: body.name,
    userId: req.user.id,
  });

  //3. Responder con la categoría guardada
  return res.status(201).json(createdCategory);
});

//Ruta para obtener las categorías del usuario
categoryRouter.get('/', async (req, res) => {
  //1. Obtener las categorías en db
  const categories = await categoryRepository.getCategories(req.user.id);

  //2. Responder con las categorías
  return res.status(200).json(categories);
});

//Ruta para actualizar una categoría
categoryRouter.put('/', async (req, res) => {
  //1. Validar el requerimiento
  const body = updateCategoryRouteSchema.body.parse(req.body);
  const params = updateCategoryRouteSchema.params.parse(req.params);

  //2. Guardarlo en db
  const updatedCategory = await categoryRepository.updateCategory({
    id: params.id,
    name: body.name,
    userId: req.user.id,
  });

  //3. Responder con la categoría actualizada
  return res.status(200).json(updatedCategory);
});

//Ruta para eliminar una categoría
categoryRouter.delete('/', async (req, res) => {
  //1. Validar el requerimiento
  const params = deleteCategoryRouteSchema.params.parse(req.params);

  //2. Eliminar la categoría en db
  const deletedCategory = await categoryRepository.deleteCategoryById({
    id: params.id,
    userId: req.user.id,
  });

  //3. Responder con la categoría eliminada
  return res.status(200).json(deletedCategory);
});

//Ruta para crear un atributo de una categoría
categoryRouter.post('/attribute', async (req, res) => {
  //1. Validar el requerimiento
  const body = createCategoryAttributeRouteSchema.body.parse(req.body);

  //2.Guardarlo en db
  const createdAttribute = await categoryRepository.createCategoryAttribute({
    name: body.name,
    category_id: body.category_id,
  });

  //3. Responder con el atributo guardado
  return res.status(201).json(createdAttribute);
});

//Ruta para actualizar un atributo de una categoría
categoryRouter.put('/attribute', async (req, res) => {
  //1. Validar el requerimiento
  const body = updateCategoryAttributeRouteSchema.body.parse(req.body);
  const params = updateCategoryAttributeRouteSchema.params.parse(req.params);

  //2. Guardarlo en db
  const updatedAttribute = await categoryRepository.updateCategoryAttribute({
    id: params.id,
    name: body.name,
  });

  //3. Responder con el atributo actualizado
  return res.status(200).json(updatedAttribute);
});

//Ruta para eliminar un atributo de una categoría
categoryRouter.delete('/attribute', async (req, res) => {
  //1. Validar el requerimiento
  const params = deleteCategoryAttributeRouteSchema.params.parse(req.params);

  //2. Eliminar el atributo en db
  const deletedAttribute = await categoryRepository.deleteAttributeById(params.id);

  //3. Responder con el atributo eliminado
  return res.status(200).json(deletedAttribute);
});

export default categoryRouter;