import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  msgError: string = "";


  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.msgError = 'veillez remplir tous les champs';
       return;
    }
    const {email, password} = this.loginForm.value;
    this.login(email, password);
  }
  
login(email: string, password: string){
  this.auth.login(email,password).subscribe({
    next: (response) =>{
      localStorage.setItem('token', response.token);
      const roles = this.auth.getUserRoles();

            //redirection en fonction du role
      if(roles.includes('USER')){
        this.router.navigate(['/livres']);
      }else if(roles.includes('ADMIN')){
        this.router.navigate(['/livres']);
        console.log("cest un admminnnn")
      }else{
        this.router.navigate(['login']);
        console.log("cest un inconnuuuu")


      }
      
    },
    error: (err) =>{
      this.msgError = 'erreur de connexion, verifie tes identifiant';
      console.error('Erreur lors de la connexion :', err);  // Afficher l'objet erreur dans la console pour inspection
    }
  });

}
  

 
}
