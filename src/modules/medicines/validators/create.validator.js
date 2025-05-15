import Joi from 'joi';

const TIPOS_MEDICAMENTO = ['Controlado', 'Antibiótico', 'Analgésico'];
const PRESENTACIONES = ['Tabletas', 'Cápsulas', 'Blíster'];
const RECETA_OPCIONES = ['S', 'N'];

export const createMedicineSchema = Joi.object({
  tipo: Joi.string().valid(...TIPOS_MEDICAMENTO).required().messages({
    'any.required': 'El tipo de medicamento es obligatorio',
    'any.only': `El tipo debe ser uno de: ${TIPOS_MEDICAMENTO.join(', ')}`
  }),
  nombre: Joi.string().max(120).required().messages({
    'string.empty': 'El nombre no puede estar vacío',
    'string.max': 'El nombre no puede exceder los 120 caracteres',
    'any.required': 'El nombre es obligatorio'
  }),
  nombreComercial: Joi.string().max(40).allow(null).messages({
    'string.max': 'El nombre comercial no puede exceder los 40 caracteres'
  }),
  presentacion: Joi.string().valid(...PRESENTACIONES).required().messages({
    'any.required': 'La presentación es obligatoria',
    'any.only': `La presentación debe ser una de: ${PRESENTACIONES.join(', ')}`
  }),
  receta: Joi.string().valid(...RECETA_OPCIONES).required().messages({
    'any.required': 'El campo receta es obligatorio',
    'any.only': `Receta debe ser: ${RECETA_OPCIONES.join(' o ')}`
  }),
  precio: Joi.number().precision(2).positive().max(99999.99).required().messages({
    'number.base': 'El precio debe ser un número',
    'number.positive': 'El precio debe ser mayor a 0',
    'number.precision': 'Máximo 2 decimales',
    'number.max': 'El precio no puede exceder 99999.99',
    'any.required': 'El precio es obligatorio'
  })
});