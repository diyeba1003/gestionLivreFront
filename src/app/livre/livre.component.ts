import { Component, OnInit } from '@angular/core';
import { Livre } from '../models/livre';
import { LivreService } from '../livre.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css']
})
export class LivreComponent implements OnInit{

  livres: Livre[] = [];
  livreAmodifier: Livre | null = null;
  msgError ='';
  estAdmin: boolean = false;
  constructor(private livreService: LivreService, private auth: AuthService, private router:Router){}

  ngOnInit(): void {
    const userRoles = this.auth.getUserRoles();
    this.estAdmin = userRoles.includes('ADMIN');
    this.getAllLivres();
  }

  getAllLivres(): void{
    this.livreService.getAllLivres().subscribe({
      next: (data) => this.livres = data,
      error: (err) => this.msgError = "erreur chargement livres"
    });
  }

  modifierLivre(id: number){
    this.router.navigate(['/modifier-livre', id]);



  }

  supprimerLivre(id:number){
    if(confirm('voulez vous supprimer ce livre ?')) {
      this.livreService.deleteLivre(id).subscribe({
        next: () => {
          console.log('livre suppprimé');
          this.getAllLivres();
        },
        error: (error) => {
          console.error('erreur de la suppression : ' , error);

        }
      });
    }

  }

}
