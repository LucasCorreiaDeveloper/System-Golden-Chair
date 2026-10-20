import  supabase  from '../config/supabaseClient.js'

//Converte
function paraMinutos(hora) {
    const [h, m] = hora.split(":");
    return Number(h) * 60 + Number(m);
}

function paraHora(minutos) {
    const h = String(Math.floor(minutos / 60 )).padStart(2, "0");
    const m = String(minutos % 60).padStart(2, "0");
    return `${h}:${m}`;
}

export async function horariosDisponiveis(req, res){
    try {
        const { data, servico_id } = req.query;

        if (!data || !servico_id) {
            return res.status(400).json ({
                mensagem: "Data e serviço são obrigatórios"
            });
    }

    const { data: config, error: erroConfig} = await supabase
    .from("configuracoes_barbearia")
    .select("*")
    .single();

    if (erroConfig || !config) {
        return res.status(500).json ({
            mensagem: "Configurações da barbearia não encontrada"
        });
    }

    const diaSemana = new Date(`${data}T12:00:00`).getDay();

    if (!config.dias_funcionamento.includes(diaSemana)) {
        return res.status(200).json ({ horarios: [] });
    }

    const { data: servico, error: erroServico } = await supabase
    .from("servicos")
    .select("duracao_minutos")
    .eq("id", servico_id)
    .single();

    if (erroServico || !servico) {
        return res.status(404).json ({ mensagem: "Serviço não encontrado", erro: erroServico?.message });
        
    }

    const { data: agendamentos, error: erroAgendamentos } = await supabase
    .from("agendamentos")
    .select("horario, servicos(duracao_minutos)")
    .eq("data", data)
    .not("status", "ilike" , "cancelado");

    if (erroAgendamentos) {
        return res.status(400).json({
            mensagem: "Erro ao buscar agendamentos",
            erro: erroAgendamentos.message
        });
    }

    const ocupados = agendamentos.map((ag) =>{
        const inicio = paraMinutos(ag.horario);
        const duracao = ag.servicos?.duracao_minutos ?? 30;
        return { inicio, fim: inicio + duracao };
    });

    const abertura = paraMinutos(config.hora_abertura);
    const fechamento = paraMinutos(config.hora_fechamento);
    const almocoInicio = paraMinutos(config.almoco_inicio);
    const almocoFim = paraMinutos(config.almoco_fim);
    const duracao = servico.duracao_minutos;

    const livres = [];

    for (
        let inicio = abertura;
        inicio + duracao <= fechamento;
        inicio += config.intervalo_minutos
    ) {
        const fim = inicio + duracao;

        const noAlmoco = inicio < almocoFim && fim > almocoInicio;
        const ocupado = ocupados.some((o) => inicio < o.fim && fim > o.inicio);

        if (!noAlmoco && !ocupado) {
            livres.push(paraHora(inicio));
        }
    }

    return res.status(200).json({ horarios: livres});

} catch (error) {
    return res.status(500).json ({ mensagem: "Erro interno do servidor"});
}

}