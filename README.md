# 🏥 API REST - Gestión de Medicamentos

API modularizada para la gestión de medicamentos desarrollada con **Node.js**, **Express**, **MySQL** y validaciones con **Joi**. Incluye estructura por módulos y seeders.

## 🔄 Características

-   CRUD completo para medicamentos.
-   Validación de datos con Joi.
-   Rutas protegidas y estructuradas por módulos.
-   Seeders para pruebas.
    
## 📅 Requisitos previos

-   Node.js (v16 o superior)
-   MySQL (v5.7 o superior)
-   npm (incluido con Node.js)
   
## 📚 Instalación

1.  Clona el repositorio:
```
git clone https://github.com/DanteLuque/API_REST_MEDICAMENTOS.git
cd API_REST_MEDICAMENTOS
```
2. Instala las dependencias:
```
npm install
```
3. Crea un archivo `.env` basado en `.env.example`:
```
# SERVER
PORT=3000

# DATABASE
HOST=localhost
USER=tu_usuario_mysql
PASSWORD=tu_contrasena_mysql
DB=FARMACIA
```
4. Crea la base de datos ejecutando estos scripts SQL:
```
SOURCE src/config/mysql/Database/base.sql;
```
5. Ejecuta el seed para insertar datos de prueba:
```
npm run seed
```
> Nota: Esto borrará todos los registros existentes, procura usarlo solo en entorno de desarrollo

## 🚀 Ejecución

### Modo desarrollo
`npm run dev` 
### Modo producción
`npm start` 
### La API estará disponible en:
`http://localhost:3000/api/v1/`
> Nota: Debes usar el puerto que haz asignado en las variables de entorno

## 🔧 Endpoints disponibles
| Método | Endpoint                                              | Descripción                                       |
|--------|-------------------------------------------------------|---------------------------------------------------|
| GET    | `/api/v1/medicine`                                    | Obtener todos los medicamentos                    |
| GET    | `/api/v1/medicine/:id`                                | Obtener un medicamento por ID                     |
| POST   | `/api/v1/medicine`                                    | Crear un nuevo medicamento                        |
| PATCH  | `/api/v1/medicine/:id`                                | Actualizar un medicamento existente               |
| DELETE | `/api/v1/medicine/:id`                                | Eliminar un medicamento (soft delete)            |
| GET    | `/api/v1/medicine/by/prescription?receta=S`           | Filtrar medicamentos por receta (`S` o `N`)       |
| GET    | `/api/v1/medicine/by/type?tipo=Analgésico`            | Filtrar medicamentos por tipo                     |

📁 Estructura del proyecto
```
danteluque-api_rest_medicamentos/  
├── README.md # Documentación del proyecto  
├── index.js # Punto de entrada del servidor  
├── package.json # Dependencias y scripts  
├── .env.example # Variables de entorno de ejemplo  
├── seed/  
│ └── seed.js # Script para poblar datos de prueba  
└── src/  
├── server.js # Inicialización del servidor Express  
├── config/  
│ └── mysql/  
│ ├─── mysql.js # Configuración y conexión a MySQL  
│ └── Database/  
│ ├─── base.sql # Script de creación de tablas  
│ └─── insert.sql # Script para insertar datos iniciales  
└── modules/  
├── medicines/  
│ ├── controllers/  
│ │ └── medicine.controller.js # Controlador con lógica CRUD  
│ ├── models/  
│ │ └── medicine.model.js # Modelo con consultas a la BD  
│ ├── routes/  
│ │ └── medicine.route.js # Rutas de la API REST  
│ └── validators/  
│ ├─── create.validator.js # Validaciones para crear medicamento  
│ └─── update.validator.js # Validaciones para actualizar medicamento  
└── shared/  
├─── controller-base.js # Controlador genérico reutilizable  
└─── model-base.js # Modelo genérico reutilizable
```

## 📝 Contribución
1.  Haz un fork del repositorio
2.  Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3.  Realiza tus cambios
4.  Commit (`git commit -m 'Agregar nueva funcionalidad'`)
5.  Push (`git push origin feature/nueva-funcionalidad`)
6.  Abre un Pull Request