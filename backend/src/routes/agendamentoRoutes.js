import express from 'express'
import { horariosDisponiveis } from "../controllers/agendamentoController.js";
import autenticar from "../controllers/middlewares/authMiddleware.js";

const router = express.Router()

router.get("/horarios", autenticar, horariosDisponiveis)

export default router