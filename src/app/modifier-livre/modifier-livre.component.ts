import { Component, OnInit } from '@angular/core';
import { LivreService } from '../livre.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modifier-livre',
  templateUrl: './modifier-livre.component.html',
  styleUrls: ['./modifier-livre.component.css']
})
export class ModifierLivreComponent implements OnInit{
  livreForm: FormGroup
  idLivre!: number;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private livresService: LivreService, private router: Router, private route: ActivatedRoute){
    this.livreForm =this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      auteur: ['', [Validators.required, Validators.minLength(3)]],
      description: ['',[Validators.required]],
      genre: ['',[Validators.required]],
      isbn: ['',[Validators.required]],
      datePublication: ['',[Validators.required,Validators.minLength(5)]],
      urlImage: ['']
    });
  }

  ngOnInit(): void {
    this.loadDonnee();

  }

  loadDonnee(){
     // je recupere l'id  et donnée du livre 
     this.idLivre = this.route.snapshot.params['id'];

     this.livresService.getLivreById(this.idLivre).subscribe({
      next: (livre) =>{
        if(livre){
          this.livreForm.patchValue(livre);

        }
      } ,
      error: (err) => {
        console.error('erreur de recuperation', err);
      }
     });
  }

  onSubmit(){
    if(this.livreForm.valid){
      this.livresService.updateLivre(this.idLivre, this.livreForm.value).subscribe(  {
        next: () => {
          this.successMessage = 'modification faite ! ';
        this.router.navigate(['/livres']);
        },
        error: (err) =>{
          console.error('erreur de la modification', err);
        }
      });
    }
  }

}
