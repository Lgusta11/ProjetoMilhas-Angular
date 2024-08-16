import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

interface AuthResponse {
  acess_token: string;
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
          const authtoken = response.body?.acess_token || '';
          this.userService.salvarToken(authtoken);
        })
      );
  }
}
