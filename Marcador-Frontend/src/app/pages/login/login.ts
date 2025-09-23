import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login as LoginDto } from '../../modelos/dto/login';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  form: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/persons']);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const loginDto: LoginDto = this.form.value;
      this.auth.login(loginDto).subscribe({
        next: (res) => {
          this.auth.saveLoginData(res);
          this.router.navigate(['/persons']);
        },
        error: (err) => {
          this.error = 'Credenciales inválidas.';
          console.error(err);
        },
      });
    }
  }
}
