import Joi from 'joi';

const TIPOS_MEDICAMENTO = ['Controlado', 'Antibiótico', 'Analgésico'];
const PRESENTACIONES = ['Tabletas', 'Cápsulas', 'Blíster'];
const RECETA_OPCIONES = ['S', 'N'];

export const updateMedicineSchema = Joi.object({
  tipo: Joi.string()
    .valid(...TIPOS_MEDICAMENTO)
    .optional() 
    .messages({
      'any.only': `El tipo debe ser uno de: ${TIPOS_MEDICAMENTO.join(', ')}`,
    }),
  nombre: Joi.string()
    .max(120)
    .optional() 
    .messages({
      'string.empty': 'El nombre no puede estar vacío',
      'string.max': 'El nombre no puede exceder los 120 caracteres',
    }),
  nombreComercial: Joi.string()
    .max(40)
    .allow(null) 
    .optional() 
    .messages({
      'string.max': 'El nombre comercial no puede exceder los 40 caracteres',
    }),
  presentacion: Joi.string()
    .valid(...PRESENTACIONES)
    .optional()
    .messages({
      'any.only': `La presentación debe ser una de: ${PRESENTACIONES.join(', ')}`,
    }),
  receta: Joi.string()
    .valid(...RECETA_OPCIONES)
    .optional()
    .messages({
      'any.only': `Receta debe ser: ${RECETA_OPCIONES.join(' o ')}`,
    }),
  precio: Joi.number()
    .precision(2)
    .positive()
    .max(99999.99)
    .optional()
    .messages({
      'number.base': 'El precio debe ser un número',
      'number.positive': 'El precio debe ser mayor a 0',
      'number.precision': 'Máximo 2 decimales',
      'number.max': 'El precio no puede exceder 99999.99',
    }),
});