import { PetPagination } from 'src/app/classes/pets/pet';
import { HttpClient } from '@angular/common/http';
import { PetService } from 'src/app/services/pet.service';
import { of } from 'rxjs';

describe('PetService', () => {
    let service: PetService;
    let http: HttpClient;

    beforeEach(() => {
        service = new PetService(http);
    });

    afterEach(() => {
        service = null;
    });

    it ('Should get Pets', () => {
        const paginationPet = [{
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
              }
            ],
            "pageable": {
              "sort": {
                "sorted": false,
                "unsorted": true,
                "empty": true
              },
              "pageSize": 2,
              "pageNumber": 0,
              "offset": 0,
              "paged": true,
              "unpaged": false
            },
            "last": false,
            "totalPages": 3,
            "totalElements": 6,
            "first": true,
            "sort": {
              "sorted": false,
              "unsorted": true,
              "empty": true
            },
            "numberOfElements": 2,
            "size": 2,
            "number": 0,
            "empty": false
        }];
        let response;
        spyOn(service, 'getPetsScroll').and.returnValue(of(paginationPet));

        service.getPetsScroll(0, 2).subscribe(res => {
            response = res;
        });

        expect(response).toBe(paginationPet);
    });

    it ('Should get Pet by id', () => {
        const pets = [{
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
          }];
        let response;
        spyOn(service, 'getPet').and.returnValue(of(pets[0]));

        service.getPet(1).subscribe(res => {
            response = res;
        });
        expect(response).toBe(pets[0]);
    });
});
