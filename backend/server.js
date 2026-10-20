import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import  authRoutes  from './src/routes/authRoutes.js'
import agendamentoRoutes from './src/routes/agendamentoRoutes.js'

const app = express();

app.use(cors())
app.use(express.json())
app.use("/auth", authRoutes);
app.use("/agendamentos", agendamentoRoutes);

app.get('/status', (req, res) =>{
res.send("Olá, o servidor está rodando !!")
});

app.listen(3000, () => {
    console.log("Servidor inicializado na porta 3000! ")
})

