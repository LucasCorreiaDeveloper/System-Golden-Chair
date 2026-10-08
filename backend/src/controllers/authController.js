import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import  supabase  from '../config/supabaseClient.js'


export async function cadastrarUsuario (req, res){

    const { nome, email, telefone, senha } = req.body;
    
    const senhaHash = await bcrypt.hash(senha, 10);

    const { data, error } = await supabase
    .from("usuarios")
    .insert([
        {
            nome,
            email,
            telefone,
            senha_hash: senhaHash,
            tipo: "cliente"
        }
    ])
    .select();

    if(error){
        return res.status(400).json({
            mensagem: "Erro ao cadastrar usuário",
            erro: error.message
        });
    } else {

        return res.status(201).json({
        mensagem: "Usuário cadastrado com sucesso !",
    });



    }

    


}