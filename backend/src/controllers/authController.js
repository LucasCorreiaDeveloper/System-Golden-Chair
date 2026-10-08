import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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

export const loginUsuario = async (req,res) => {
    try{
        //pegar os dados enviados pelo cliente
    const { email, senha } = req.body

    //validação de dados
    if(!email || !senha) {
        return res.status(400).json({
            mensagem: "E-mail e senha são obrigatórios"
        });
    }    

    //Buscar o usuário no Supabase
    const { data, error } = await supabase
    .from("usuarios")
    .select("id, nome, tipo, senha_hash")
    .eq("email", email)
    .single();


    //Usuário não encontrado
    if(error || !data) {
        return res.status(401).json({
            mensagem: "E-mail ou senha inválidos!"
        });
    }

    //Comparação de senha informada pelo usuário com o hash do banco
    const senhaValida = await bcrypt.compare(
        senha,
        data.senha_hash
    );

    //Caso de senha incorreta
    if(!senhaValida) {
        return res.status(401).json({
            mensagem: "E-mail ou senha inválidos!"
        });
    }


    //Gerar o token JWT
    const token = jwt.sign(
        {
            id: data.id,
            tipo: data.tipo
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    //Resposta de sucesso
    return res.status(200).json({
        token,
        usuario: {
            id: data.id,
            nome: data.nome,
            tipo: data.tipo
        }
    });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: "Erro interno do servidor"
        });
    }
}
