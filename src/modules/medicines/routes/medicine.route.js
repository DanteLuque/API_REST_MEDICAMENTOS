import { Router } from "express";
import medicineController from "../controllers/medicine.controller.js";

const MedicineRouter = Router();

MedicineRouter.get("/", (req, res) => medicineController.getAll(req, res));
MedicineRouter.get("/:id", (req, res) => medicineController.getById(req, res));
MedicineRouter.post("/", (req, res) => medicineController.create(req, res));
MedicineRouter.patch("/:id", (req, res) => medicineController.update(req, res));
MedicineRouter.delete("/:id", (req, res) => medicineController.deleteById(req, res));
MedicineRouter.get("/by/prescription", (req, res) => medicineController.getByPrescription(req, res));
MedicineRouter.get("/by/type", (req, res) => medicineController.getByType(req, res));

export default MedicineRouter;