import * as z from 'zod';

export const UserSchema = z.object({
  id: z.number().optional(), // Lo ponemos opcional porque al registrarse aún no hay ID
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.email('Formato de correo inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  department: z.string().min(2, 'El nombre del departamento es demasiado corto'),
  email_verified: z.boolean().default(false),
});

/** @typedef { z.infer<typeof UserSchema> } User*/
