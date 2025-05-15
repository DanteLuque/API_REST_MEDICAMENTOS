import { BaseController } from "../../shared/controller-base.js";
import Medicine from "../models/medicine.model.js";
import { createMedicineSchema } from "../validators/create.validator.js";
import { updateMedicineSchema } from "../validators/update.validator.js";
import dotenv from "dotenv";
dotenv.config();

class MedicineController extends BaseController {
    async getAll(_, res) {
        try {
            const medicine = await Medicine.getAll(this.getDbPool());
            res.json(medicine);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener las medicinas");
        }
    }

    async getById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const medicine = await Medicine.getById(this.getDbPool(), id);

            if (!medicine) return res.status(404).json({ message: "Medicina no encontrada" });
            res.json(medicine);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener la medicina");
        }
    }

    async create(req, res) {
        try {
            const { error: validationError, value } = createMedicineSchema.validate(req.body, { abortEarly: false });
            if (validationError) {
                return res.status(400).json({
                    message: "Validación fallida",
                    details: validationError.details.map(d => d.message)
                });
            }

            const medicine = new Medicine(
                null,
                value.tipo,
                value.nombre,
                value.nombreComercial || null,
                value.presentacion,
                value.receta,
                value.precio
            );

            const result = await medicine.create(this.getDbPool());
            res.status(201).json({ message: "Medicamento creado", id: result.insertId });
        } catch (error) {
            this.handleError(res, 500, error, "Error al crear el medicamento");
        }
    }

    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            const existingMedicine = await Medicine.getById(this.getDbPool(), id);
            if (!existingMedicine) return res.status(404).json({ message: "Medicamento no encontrado" });

            const { error } = updateMedicineSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({
                    message: "Validación fallida",
                    details: error.details.map(d => d.message)
                });
            }
            
            const current = existingMedicine;
            const {
                tipo = current.TIPO,
                nombre = current.NOMBRE,
                nombreComercial = current.NOM_COMERCIAL,
                presentacion = current.PRESENTACION,
                receta = current.RECETA,
                precio = current.PRECIO,
            } = req.body;

            const updatedMedicine = new Medicine(
                id,
                tipo,
                nombre,
                nombreComercial,
                presentacion,
                receta,
                precio,
            );

            const result = await updatedMedicine.update(this.getDbPool());
            if (result.affectedRows === 0) return res.sendStatus(204);

            res.json({ message: "Medicamento actualizado" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al actualizar el medicamento");
        }
    }

    async deleteById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const medicine = await Medicine.getById(this.getDbPool(), id);
            if (!medicine) return res.status(404).json({ message: "Medicamento no encontrado" });

            const result = await Medicine.softDelete(this.getDbPool(), id);
            if (result.affectedRows === 0) {
                return res.status(400).json({
                    message: "No se puede eliminar medicamentos con receta"
                });
            }
            res.json({ message: "Medicamento eliminado" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al eliminar el medicamento");
        }
    }

    async getByPrescription(req, res) {
        try {
            const { receta } = req.query;
            const medicines = await Medicine.getByPrescription(this.getDbPool(), receta);
            res.json(medicines);
        } catch (error) {
            this.handleError(res, 500, error, "Error al filtrar por receta");
        }
    }

    async getByType(req, res) {
        try {
            const { tipo } = req.query; // Ej: /medicines?tipo=Analgésico
            const medicines = await Medicine.getByType(this.getDbPool(), tipo);
            res.json(medicines);
        } catch (error) {
            this.handleError(res, 500, error, "Error al filtrar por tipo");
        }
    }

}

export default new MedicineController();