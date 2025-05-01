import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  
  msgError: string="";

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(6)],
      repeatpassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid || !this.validePassword) {
         this.msgError ="les deux mots de passes doivent etre identique";
         return;
        }  
        const {email, password} = this.registerForm.value;
        this.register(email, password); 
        
      }

validePassword(): boolean{
  const password = this.registerForm.get('password')?.value;
  const repeatpassword = this.registerForm.get('repeatpassword')?.value;
  return password === repeatpassword;

}

register(email: string, password: string): void {
  this.auth.register(email, password).subscribe({
    next: (response: string) => {
      this.router.navigate(['/login']);
    },

    error: (err: HttpErrorResponse) => { 
      if(err.status === 409){
        this.msgError = err.error.token;
      }
      else if (err.error && err.error.message) {
        this.msgError = 'Erreur d\'inscription : ' + err.error.message;
      } else {
        this.msgError = 'Erreur inconnue lors de l\'inscription.';
      }
    }
  });

}
}
