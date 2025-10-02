import { api } from "./api";

export async function getGestors() {
    try {
        const accessToken = sessionStorage.getItem('token');
        
        const result = await api.get('/gestors', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(accessToken)}`
            }
        });
        return result;
    } catch (error) {
        console.error("Error in getGestors:", error);
        throw error; // rethrow the error
    }
}


export async function deleteGestor(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/gestor/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}


export async function updateGestor(data) {
    const accessToken = sessionStorage.getItem('token');
    console.log("chegou na função")
    const result = await api.put(`/gestor/${data.id}`, {
        id:               data.id,
        nome:             data.nomeGestor,
        sobrenome:        data.sobrenomeGestor,
        idade:            data.idadeGestor,
        genero:           data.generoGestor,
        dataDeNascimento: data.dataDeNascimentoGestor,
        localDeTrabalho:  data.localDeTrabalhoGestor,
        CRM:              data.CRMGestor,
        tipoDeContrato:   data.tipoDeContratoGestor,
        formacao:         data.formacaoGestor,
        senhaProvisoria:  data.senhaProvisoriaGestor,
        metas:            data.metasGestor,
        atendimentos:     data.atendimentosGestor,
        eventosP:         data.ePGesor

    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function createGestor(data) {
    const accessToken = sessionStorage.getItem('token');
    console.log('entrou na função /br', data )
    const result = await api.post('/gestor', {
        nome:             data.nomeGestor,
        sobrenome:        data.sobrenomeGestor,
        idade:            data.idadeGestor,
        genero:           data.generoGestor,
        dataDeNascimento: data.dataDeNascimentoGestor,
        localDeTrabalho:  data.localDeTrabalhoGestor,
        CRM:              data.CRMGestor,
        tipoDeContrato:   data.tipoDeContratoGestor,
        formacao:         data.formacaoGestor,
        senhaProvisoria:  data.senhaProvisoriaGestor,
        metas:            data.metasGestor,
        atendimentos:     data.atendimentosGestor,
        eventosP:         data.ePGesor

    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
