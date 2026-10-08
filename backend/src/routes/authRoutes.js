import express  from 'express'
import { cadastrarUsuario}  from '../controllers/authController.js';
import { loginUsuario } from '../controllers/authController.js';

const router = express.Router()


router.post("/cadastro", cadastrarUsuario);

router.post("/login", loginUsuario);

export default router