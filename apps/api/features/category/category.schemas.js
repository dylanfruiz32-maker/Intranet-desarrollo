import * as z from 'zod'

export const categorySchema = z.object({
    id: z.number(),
    user_id: z.number(),
    name: z.string().min(3, { message: 'El nombre de la categoria demasiado corto'}),
    deleted_at: z.date().nullable(),
});

/** @typedef { z.infer<typeof categorySchema> } Category */

export const categoryAttributeSchema = z.object({
    id: z.number(),
    category_id: z.number(),
    name: z.string().min(3, { message: 'El nombre del atributo no puede estar vacio' }),
    deleted_at: z.date().nullable(),
});

/** @typedef {z.infer<typeof categoryAttributeSchema>} CategoryAttribute */