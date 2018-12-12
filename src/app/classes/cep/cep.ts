export interface Endereco {
    cep: string;
    rua: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    unidade?: string;
    numero: string;
    referencia: string;
    id?: number;
}

export interface EnderecoAjax {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    unidade: string;
    ibge: string;
    gia: string;
}

export const APIEnderecoFactory = function(end: EnderecoAjax): Endereco {
    return {
        bairro: end.bairro,
        cep: end.cep,
        cidade: end.localidade,
        complemento: '',
        numero: '',
        referencia: '',
        rua: end.logradouro,
        uf: end.uf,
        unidade: end.unidade
    };
};