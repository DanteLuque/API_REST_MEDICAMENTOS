import ModelBase from "../../shared/model-base.js";

class Medicine extends ModelBase {
    constructor(
        id = null,
        tipo,
        nombre,
        nombreComercial = null,
        presentacion,
        receta,
        precio
    ) {
        super();
        this.id = id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.nombreComercial = nombreComercial;
        this.presentacion = presentacion;
        this.receta = receta;
        this.precio = precio;
    }

    static async getAll(conexion) {
        const [result] = await conexion.query(
            "SELECT * FROM MEDICAMENTOS WHERE deleted_at IS NULL"
        );
        return result;
    }

    static async getById(conexion, id) {
        const [result] = await conexion.query(
            "SELECT * FROM MEDICAMENTOS WHERE ID = ? AND deleted_at IS NULL",
            [id]
        );
        return result[0];
    }

    static async getByPrescription(conexion, receta) {
        const [result] = await conexion.query(
            "SELECT * FROM MEDICAMENTOS WHERE RECETA = ? AND deleted_at IS NULL",
            [receta]
        );
        return result;
    }

    static async getByType(conexion, tipo) {
        const [result] = await conexion.query(
            "SELECT * FROM MEDICAMENTOS WHERE TIPO = ? AND deleted_at IS NULL",
            [tipo]
        );
        return result;
    }

    async create(conexion) {
        const now = new Date();
        this.created_at = now;
        this.updated_at = now;

        const [result] = await conexion.query(
            `INSERT INTO MEDICAMENTOS (TIPO, NOMBRE, NOM_COMERCIAL, PRESENTACION, RECETA, PRECIO, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                this.tipo,
                this.nombre,
                this.nombreComercial,
                this.presentacion,
                this.receta,
                this.precio,
                this.created_at,
                this.updated_at
            ]
        );
        this.id = result.insertId;
        return result;
    }

    async update(conexion) {
        this.updated_at = new Date();

        const [result] = await conexion.query(
            `UPDATE MEDICAMENTOS
             SET TIPO = ?, NOMBRE = ?, NOM_COMERCIAL = ?, PRESENTACION = ?, RECETA = ?, PRECIO = ?, updated_at = ?
             WHERE ID = ? AND deleted_at IS NULL`,
            [
                this.tipo,
                this.nombre,
                this.nombreComercial,
                this.presentacion,
                this.receta,
                this.precio,
                this.updated_at,
                this.id
            ]
        );
        return result;
    }

    static async softDelete(conexion, id) {
        const deleted_at = new Date();
        const [result] = await conexion.query(
            `UPDATE MEDICAMENTOS SET deleted_at = ? WHERE ID = ? AND RECETA = 'N'  AND deleted_at IS NULL`,
            [deleted_at, id]
        );
        return result;
    }
}

export default Medicine;