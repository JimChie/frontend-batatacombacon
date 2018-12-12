import { Especie } from "../especie/especies";
import { Sexo } from "../sexo/sexo";
import { Porte } from "../porte/porte";
import { Objetivo } from "../objetivo/objetivo";
import { SafeResourceUrl } from "@angular/platform-browser";
import { Endereco } from "../cep/cep";

export interface Pet {
    id?: number;
    nome: string;
    descricao: string;
    sexo: Sexo;
    porte: Porte;
    especie: Especie;
    objetivo: Objetivo;
    localPet: Endereco;
    fotos: Array<string>;
    idUsuario: number;
    created_at?: string;
    photoLink?: SafeResourceUrl;

}

export interface PetAPI {
    id?: number;
    nome: string;
    descricao: string;
    sexo: Sexo;
    porte: Porte;
    especie: Especie;
    objetivo: Objetivo;
    localPet: Endereco;
    fotos: Array<string>;
    idUsuario: number;
    created_at?: string;
}

export class PetPagination {
    content: Array<Pet>;
    pageable:{
        sort: {
            sorted: boolean,
            unsorted: boolean,
            empty: boolean
        },
        pageSize: number,
        pageNumber: number,
        offset: number,
        unpaged: boolean,
        paged: true
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    sort: {
        sorted: boolean,
        unsorted: boolean,
        empty: boolean
    };
    numberOfElements: number;
    size: number;
    empty: boolean;
    
}

export const APIPetFactory = function(pet: Pet): PetAPI {
    return {
        descricao: pet.descricao,
        especie: pet.especie,
        fotos: pet.fotos,
        idUsuario: pet.idUsuario,
        nome: pet.nome,
        objetivo: pet.objetivo,
        porte: pet.porte,
        sexo: pet.sexo,
        localPet: {
            bairro: pet.localPet.bairro,
            cep: pet.localPet.cep,
            cidade: pet.localPet.cidade,
            complemento: pet.localPet.complemento,
            numero: pet.localPet.numero,
            referencia: pet.localPet.referencia,
            rua: pet.localPet.rua,
            uf: pet.localPet.uf
        }
        //created_at: pet.created_at,
        //id: pet.id
    };
};