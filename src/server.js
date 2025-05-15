import express from 'express';
import db from './config/mysql/mysql.js';
import MedicineRouter from './modules/medicines/routes/medicine.route.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.medicine_path = '/api/v1/medicine';

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`👾 I'M ALIVE => PORT: ${this.port}`);
        });
    }

    async connectDB() {
        await db.testConnection();
    }

    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.medicine_path, MedicineRouter);
    }
}

export default Server;