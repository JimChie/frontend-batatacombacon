import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Pet, PetPagination, APIPetFactory, PetAPI } from '../classes/pets/pet';

@Injectable()
export class PetServiceMock {
  constructor() { }

  getUsers(): Array<{}> {
      return [
          {
              name: 'user1',
              surname: 'usersurname1'
          }
      ];
  }

  getPetsScroll(page: number, size: number): Array<{}> {
    return [ {
        "content": [
          {
            "id": 1,
            "nome": "Panqueca",
            "descricao": "Uma princesa mimada",
            "sexo": "FEMEA",
            "porte": "PEQUENO",
            "especie": "FELINO",
            "objetivo": "ENCONTRADO",
            "localPet": {
              "id": 1,
              "cep": "89228750",
              "rua": "Rua Antonio Augusto do Livramento",
              "numero": "40",
              "complemento": "",
              "bairro": "Espinheiros",
              "cidade": "Joinville",
              "uf": "SC",
              "referencia": ""
            },
            "fotos": [
              1
            ],
            "idUsuario": 2,
            "created_at": "08/12/2018 17:27"
          },
          {
            "id": 2,
            "nome": "Backup",
            "descricao": "A gata reserva",
            "sexo": "FEMEA",
            "porte": "PEQUENO",
            "especie": "FELINO",
            "objetivo": "ENCONTRADO",
            "localPet": {
              "id": 2,
              "cep": "89228750",
              "rua": "Rua Antonio Augusto do Livramento",
              "numero": "40",
              "complemento": "",
              "bairro": "Espinheiros",
              "cidade": "Joinville",
              "uf": "SC",
              "referencia": ""
            },
            "fotos": [
              2
            ],
            "idUsuario": 2,
            "created_at": "08/12/2018 17:34"
          },
          {
            "id": 3,
            "nome": "Fofinha",
            "descricao": "A intrusa fofinha",
            "sexo": "FEMEA",
            "porte": "PEQUENO",
            "especie": "FELINO",
            "objetivo": "ENCONTRADO",
            "localPet": {
              "id": 3,
              "cep": "89228750",
              "rua": "Rua Antonio Augusto do Livramento",
              "numero": "40",
              "complemento": "",
              "bairro": "Espinheiros",
              "cidade": "Joinville",
              "uf": "SC",
              "referencia": ""
            },
            "fotos": [
              3
            ],
            "idUsuario": 2,
            "created_at": "08/12/2018 17:37"
          },
          {
            "id": 4,
            "nome": "GordoAlfredo",
            "descricao": "Um chato insuportável",
            "sexo": "MACHO",
            "porte": "PEQUENO",
            "especie": "FELINO",
            "objetivo": "ENCONTRADO",
            "localPet": {
              "id": 4,
              "cep": "89228750",
              "rua": "Rua Antonio Augusto do Livramento",
              "numero": "40",
              "complemento": "",
              "bairro": "Espinheiros",
              "cidade": "Joinville",
              "uf": "SC",
              "referencia": ""
            },
            "fotos": [
              4
            ],
            "idUsuario": 2,
            "created_at": "08/12/2018 17:38"
          },
          {
            "id": 12,
            "nome": "aaaaaa222kk9",
            "descricao": "ddd2",
            "sexo": "MACHO",
            "porte": "PEQUENO",
            "especie": "AVE",
            "objetivo": "PERDIDO",
            "localPet": {
              "id": 12,
              "cep": "89204100",
              "rua": "Rua Itaiópolis",
              "numero": "44",
              "complemento": "bbb",
              "bairro": "América",
              "cidade": "Joinville",
              "uf": "SC",
              "referencia": "ccc"
            },
            "fotos": [
              5,
              6
            ],
            "idUsuario": 3,
            "created_at": "09/12/2018 02:22"
          },
          {
            "id": 13,
            "nome": "aaa",
            "descricao": "bbb",
            "sexo": "MACHO",
            "porte": "PEQUENO",
            "especie": "EQUINO",
            "objetivo": "PERDIDO",
            "localPet": {
              "id": 13,
              "cep": "89203100",
              "rua": "Rua Euzébio de Queirós",
              "numero": "11",
              "complemento": "11",
              "bairro": "Atiradores",
              "cidade": "Joinville",
              "uf": "SC",
              "referencia": "11"
            },
            "fotos": [
              7
            ],
            "idUsuario": 5,
            "created_at": "09/12/2018 12:08"
          }
        ],
        "pageable": {
          "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
          },
          "pageSize": 6,
          "pageNumber": 0,
          "offset": 0,
          "paged": true,
          "unpaged": false
        },
        "totalPages": 2,
        "totalElements": 12,
        "last": false,
        "first": true,
        "sort": {
          "sorted": false,
          "unsorted": true,
          "empty": true
        },
        "numberOfElements": 6,
        "size": 6,
        "number": 0,
        "empty": false
    }]
  }

//   getPetsScroll(page: number, size: number): Observable<PetPagination> {
//     return this.http.get<PetPagination>(`${this.petsUrl}?page=${page}&size=${size}`)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }
  
//   getPet(id: number): Observable<Pet> {
//     return this.http.get<Pet>(`${this.petsUrl}/${id}`).pipe(
//       catchError(this.handleError)
//     );
//   }

//   getPetsByFilterScroll(filter: FilterPets, page: number, size: number): Observable<PetPagination>{

//     if((filter.objetivo===""||filter.objetivo===undefined)&&
//         (filter.especie===""||filter.especie===undefined)&&
//         (filter.porte===""||filter.porte===undefined)&&
//         (filter.sexo===""||filter.sexo===undefined))
//       return this.getPetsScroll(page, size);

//     let str: string = `&`

//     if(filter.especie!=="" && filter.especie!==undefined)
//       str += `especie=${filter.especie}&`
//     if(filter.porte!=="" && filter.porte!==undefined)
//       str += `porte=${filter.porte}&`
//     if(filter.objetivo!=="" && filter.objetivo!==undefined)
//       str += `objetivo=${filter.objetivo}&`
//     if(filter.sexo!=="" && filter.sexo!==undefined)
//       str += `sexo=${filter.sexo}&`
    
//     return this.http.get<PetPagination>(`${this.petsUrl}?page=${page}&size=${size}${str}`)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   addPet(pet: Pet): Observable<any>{
//     const petPayload = APIPetFactory(pet);
//     return this.http.post<PetAPI>(this.petsUrl, petPayload, httpOptions).pipe(
//       catchError(this.handleError)
//     );
//   }

//   updatePet(pet: Pet, idPet: number): Observable<any> {
//     const petPayload = APIPetFactory(pet);
//     return this.http.put(`${this.petsUrl}/${idPet}?idPet=${idPet}`, petPayload, httpOptions).pipe(
//       catchError(this.handleError)
//     );
//   }
  
//   deletePet(pet: number): Observable<any> {
//     const id = typeof pet === 'number' ? pet : undefined;
//     const url = `${this.petsUrl}/${id}`;
  
//     return this.http.delete<Pet>(url, httpOptions).pipe(
//       catchError(this.handleError)
//     );
//   }

}