import express from "express";
import userRouter from './users/user'; // Importamos el router de usuarios
import postRouter from './posts/post'; // Importamos el router de categorias



const router = express.Router(); // Creamos un router de express    

router.use("/users", userRouter); // Usamos el router de usuarios para la ruta /users
router.use("/posts", postRouter); // Usamos el router de usuarios para la ruta /categories

export default router; // Exportamos el router para que pueda ser utilizado en otras partes de la aplicación

