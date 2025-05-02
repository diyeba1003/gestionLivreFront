import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livre } from './models/livre';

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  private apiUrl = 'http://localhost:8080/api/livre';


  constructor(private http: HttpClient) { }

  // la liste des livres
  getAllLivres(): Observable<Livre[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Livre[]>(`${this.apiUrl}/listeLivre`, { headers });
  }
  

  // livre par id
  getLivreById(id: number): Observable<Livre> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Livre>(`${this.apiUrl}/${id}`, {headers});
  }

  //ajout d'un livre
  addLivre(livre: Livre): Observable<Livre> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Livre>(`${this.apiUrl}/addLivre`, livre, {headers});
  }

//modification du livre
  updateLivre(id: number, livre: Livre): Observable<Livre> {
    const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Livre>(`${this.apiUrl}/${id}`, livre, {headers});
  }
//suppression d'un livre
deleteLivre(id: number): Observable<void> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
}


}
