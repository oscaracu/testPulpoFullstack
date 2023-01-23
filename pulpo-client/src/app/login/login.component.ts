import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from '../login.dto';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usuario!: LoginDto;
  username!: string;
  password!: string;
  error: string = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  onLogin(): void {
    this.usuario = new LoginDto(this.username, this.password);
    this.authService.login(this.usuario).subscribe((data) => {
      if (data.token) {
        this.error = '';
        this.tokenService.setToken(data.token);
        this.router.navigate(['/dashboard']);
      } else {
        this.error = data.response.message;
      }
    });
  }
}
