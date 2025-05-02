import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Url de notre API backend
  private apiUrl = 'http://localhost:8080/api/auth';

  

  constructor(private http: HttpClient) { }

  // je recupere les roles pour pouvoir faire la redirection 
  getUserRoles(): string[] {
    const token = localStorage.getItem('token');
    if (token) {
        const decodeToken: any = jwtDecode(token);
        console.log('Jeton décodé :', JSON.stringify(decodeToken, null, 2));

   const roles = Array.isArray(decodeToken.role) ? decodeToken.role : [];

return roles;  

    }
    return [];
}


  //methode pour envoyer les infos de la connexion

  login(email:string, password: string): Observable<any> {
    const body = {email, password};
    return this.http.post<string>(`${this.apiUrl}/login`,body,{
      headers: new HttpHeaders({'Content-Type' : 'application/json'}),
      responseType: 'json'
    });
  }


  //methode inscription

  register(email:string, password: string): Observable<any> {
    const body = {email, password};
    return this.http.post<string>(`${this.apiUrl}/register`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'json'
    });
  }

  // verification si l'utilisateur est connecté
  isConnected(): boolean{
    const token = localStorage.getItem('token');
    console.log("veriff connexion : " + token);
    return !!token;
  }

  //deconnexion de l'utilisateur
  logout():void {
    localStorage.removeItem('token');
  }
}


