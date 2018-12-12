import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Usuario, APIUsuarioFactory, UsuarioAPI, UsuarioWhoami } from '../classes/usuario/usuario';
import { catchError } from 'rxjs/operators';
import { PetPagination } from '../classes/pets/pet';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': '*/*'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private usersUrl = 'https://backendcombacon.herokuapp.com/user';
  
  // userSignUpNow verifica se a pessoa é recem cadastrada e é usada
  // para fazer os guards e redirecionamento para tela principal.
  // Mesmo tipo do WhoAmI, mas é usado somente no cadastro! Não misturar as coisas!
  userSignUpNow: UsuarioWhoami;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.usersUrl}`).pipe(
      catchError(this.handleError)
    );
  }
  
  getUser(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.usersUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addUser(usuario: Usuario): Observable<any> {
    const userPayload = APIUsuarioFactory(usuario);
    
    return this.http.post<UsuarioAPI>(this.usersUrl, userPayload, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateUser(usuario: Usuario): Observable<any> {
    const userPayload = APIUsuarioFactory(usuario);
    return this.http.put<UsuarioAPI>(`${this.usersUrl}/${usuario.id}?idUser=${usuario.id}`, userPayload, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  getPetsUser(userId: number): Observable<PetPagination>{
      return this.http.get<PetPagination>(`${this.usersUrl}/${userId}/pet?page=0&size=1000`).pipe(
      catchError(this.handleError)
    )
  }

  changeUserPassword(submitForm: FormGroup): Observable<any> {
    const body = { "senha": submitForm.get('senha').value };
    const id = submitForm.get('id').value;
    const token = submitForm.get('token').value;
    return this.http.post<any>(`${this.usersUrl}/changePassword?id=${id}&token=${token}`, body , httpOptions)
    .pipe(catchError(this.handleError)
    );
  }

  resetUserPassword(email: string): Observable<any> {
    const body = { "email": email };
    return this.http.post<any>(`${this.usersUrl}/resetPassword?email=${email}`, body, httpOptions)
    .pipe(catchError(this.handleError)
    );
  }

  private handleError(error: any) { 
    return throwError(error);
  }

}
