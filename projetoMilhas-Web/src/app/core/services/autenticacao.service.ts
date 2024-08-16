import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

interface AuthResponse {
  access_token: string;  // Corrigido para 'access_token'
}

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private userService: UserService) {}

  autenticar(
    email: string,
    senha: string
  ): Observable<HttpResponse<AuthResponse>> {
    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/auth/login`,
        { email, senha },
        { observe: 'response' }
      )
      .pipe(
        tap((response) => {
          const authToken = response.body?.access_token || '';

          if (authToken) {
            if (authToken.split('.').length === 3) {
              this.userService.salvarToken(authToken);
            } else {
              console.error('Token inválido recebido:', authToken);
            }
          } else {
            console.error('Nenhum token recebido na resposta:', response);
          }
        })
      );
  }
}
