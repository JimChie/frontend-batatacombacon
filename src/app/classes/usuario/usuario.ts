export interface Usuario {
    id?: number;
    email: string;
    nome: string;
    senha: string;
    confirmSenha?: string;
}

export interface UsuarioAPI {
    id?: number;
    email: string;
    nome: string;
    senha: string;
}

export interface UsuarioWhoami {
    id?: number;
    email: string;
    nome: string;
    acabouDeRegistrar?: boolean;
    acabouDeFazerLogin?: boolean;
}

export const APIUsuarioFactory = function(usuario: Usuario): UsuarioAPI {
    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha
    };
};
