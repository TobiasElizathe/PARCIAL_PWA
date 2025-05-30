"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./users/user")); // Importamos el router de usuarios
const post_1 = __importDefault(require("./posts/post")); // Importamos el router de categorias
const router = express_1.default.Router(); // Creamos un router de express    
router.use("/users", user_1.default); // Usamos el router de usuarios para la ruta /users
router.use("/posts", post_1.default); // Usamos el router de usuarios para la ruta /categories
exports.default = router; // Exportamos el router para que pueda ser utilizado en otras partes de la aplicación
