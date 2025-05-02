import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { LivreComponent } from './livre/livre.component';
import { ModifierLivreComponent } from './modifier-livre/modifier-livre.component';
import { AjoutLivreComponent } from './ajout-livre/ajout-livre.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'livres', component: LivreComponent },
  { path: 'modifier-livre/:id', component: ModifierLivreComponent },
  { path: 'ajoutLivre', component: AjoutLivreComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
