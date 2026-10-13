import jwt from 'jsonwebtoken';

function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;

if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não fornecido'});
}

const partes = authHeader.split(' ');

if (partes.length !== 2 || partes[0] !== 'Bearer') {
    return res.status(401).json ({ mensagem: 'Formato de token inválido'});
}

const token = partes[1];

try{
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
} catch (error) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado'});
}

}

export default autenticar;