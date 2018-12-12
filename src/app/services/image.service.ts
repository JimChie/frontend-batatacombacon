import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    //'Content-Type': 'multipart/form-data',
    'accept': '*/*'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imageUrl = 'https://backendcombacon.herokuapp.com/images';

  constructor(private http: HttpClient) { }

  addPetImage(imagem: File, petId: number): Observable<any> {
    const formData:FormData = new FormData();
    formData.append('imagem', imagem, `pet-${petId}.png`);

    return this.http.post(`${this.imageUrl}/pet/${petId}`, formData).pipe(
      catchError(this.handleError)
    );
  }

  // getImage(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.imageUrl}/${id}`).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  getImage(idImage: number): Observable<Blob> {
    return this.http.get(`${this.imageUrl}/${idImage}`, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) { 
    return throwError(error);
  }
}
