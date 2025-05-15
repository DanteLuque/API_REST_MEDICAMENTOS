import db from "../src/config/mysql/mysql.js";

const medicines = [
    {
        TIPO: "Controlado",
        NOMBRE: "Paracetamol",
        NOM_COMERCIAL: "Dolex",
        PRESENTACION: "Tabletas",
        RECETA: "S",
        PRECIO: 15.50
    },
    {
        TIPO: "Antibiótico",
        NOMBRE: "Amoxicilina",
        NOM_COMERCIAL: "AmoxiPlus",
        PRESENTACION: "Cápsulas",
        RECETA: "S",
        PRECIO: 30.00
    },
    {
        TIPO: "Analgésico",
        NOMBRE: "Ibuprofeno",
        NOM_COMERCIAL: "Advil",
        PRESENTACION: "Tabletas",
        RECETA: "N",
        PRECIO: 25.00
    },
    {
        TIPO: "Controlado",
        NOMBRE: "Tramadol",
        NOM_COMERCIAL: "Tramal",
        PRESENTACION: "Blíster",
        RECETA: "S",
        PRECIO: 40.75
    },
    {
        TIPO: "Antibiótico",
        NOMBRE: "Ciprofloxacina",
        NOM_COMERCIAL: "Cipro",
        PRESENTACION: "Tabletas",
        RECETA: "S",
        PRECIO: 50.00
    },
    {
        TIPO: "Analgésico",
        NOMBRE: "Aspirina",
        NOM_COMERCIAL: "Bayer",
        PRESENTACION: "Tabletas",
        RECETA: "N",
        PRECIO: 10.00
    },
    {
        TIPO: "Controlado",
        NOMBRE: "Oxicodona",
        NOM_COMERCIAL: "OxyContin",
        PRESENTACION: "Cápsulas",
        RECETA: "S",
        PRECIO: 80.00
    },
    {
        TIPO: "Antibiótico",
        NOMBRE: "Azitromicina",
        NOM_COMERCIAL: "Zithromax",
        PRESENTACION: "Tabletas",
        RECETA: "S",
        PRECIO: 45.00
    },
    {
        TIPO: "Analgésico",
        NOMBRE: "Naproxeno",
        NOM_COMERCIAL: "Aleve",
        PRESENTACION: "Tabletas",
        RECETA: "N",
        PRECIO: 20.00
    },
    {
        TIPO: "Controlado",
        NOMBRE: "Fentanilo",
        NOM_COMERCIAL: "Duragesic",
        PRESENTACION: "Blíster",
        RECETA: "S",
        PRECIO: 90.00
    },
    {
        TIPO: "Antibiótico",
        NOMBRE: "Clindamicina",
        NOM_COMERCIAL: "Cleocin",
        PRESENTACION: "Cápsulas",
        RECETA: "S",
        PRECIO: 35.00
    },
    {
        TIPO: "Analgésico",
        NOMBRE: "Ketorolaco",
        NOM_COMERCIAL: "Toradol",
        PRESENTACION: "Tabletas",
        RECETA: "S",
        PRECIO: 60.00
    }
];

async function seedDatabase() {
    try {
        const pool = db.getPool();

        await pool.query("DELETE FROM MEDICAMENTOS");

        for (const medicine of medicines) {
            const now = new Date();
            await pool.query(
                `INSERT INTO MEDICAMENTOS 
                 (TIPO, NOMBRE, NOM_COMERCIAL, PRESENTACION, RECETA, PRECIO, created_at, updated_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    medicine.TIPO,
                    medicine.NOMBRE,
                    medicine.NOM_COMERCIAL,
                    medicine.PRESENTACION,
                    medicine.RECETA,
                    medicine.PRECIO,
                    now,
                    now
                ]
            );
        }

        console.log("🌱 Seed completado. Se han insertado 12 medicamentos.");
    } catch (error) {
        console.error("❌ Error al ejecutar el seed:", error.message);
    } finally {
        process.exit(); 
    }
}

seedDatabase();