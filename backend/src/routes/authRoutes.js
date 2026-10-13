import express  from 'express'
import { cadastrarUsuario}  from '../controllers/authController.js';
import { loginUsuario } from '../controllers/authController.js';
import autenticar from '../controllers/middlewares/authMiddleware.js';

const router = express.Router()



router.post("/cadastro", cadastrarUsuario);

router.post("/login", loginUsuario);

router.get('/perfil', autenticar, (req, res)=>{
    res.status(200).json({ usuario: req.usuario });
})


export default router