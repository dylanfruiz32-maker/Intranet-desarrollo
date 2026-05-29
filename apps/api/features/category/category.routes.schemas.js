import * as z from 'zod';
import { categorySchema, categoryAttributeSchema } from './category.schemas.js';

export const createCategoryRouteSchema = {
  body: categorySchema.pick({ name: true }),
  params: null,
  query: null,
};

export const getCategoriesRouteSchema = {
  body: null,
  params: null,
  query: null,
};

export const updateCategoryRouteSchema = {
  body: categorySchema.pick({ name: true }),
  params: z.object({
    id: z.coerce.number({ error: 'No es un id valido' }),
  }),
  query: null,
};

export const deleteCategoryRouteSchema = {
  body: null,
  params: z.object({
    id: z.coerce.number({ error: 'No es un id valido' }),
  }),
  query: null,
};

export const createAttributeRouteSchema = {
  body: categoryAttributeSchema.pick({
    category_id: true,
    name: true,
  }),
  params: null,
  query: null,
};

export const updateAttributeRouteSchema = {
  body: categoryAttributeSchema.pick({ name: true }),
  params: z.object({
    id: z.coerce.number({ error: 'No es un id de atributo valido' }),
  }),
  query: null,
};

export const deleteAttributeRouteSchema = {
  body: null,
  params: z.object({
    id: z.coerce.number({ error: 'No es un id de atributo valido' }),
  }),
  query: null,
};