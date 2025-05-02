import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LivreService } from '../livre.service';

@Component({
  selector: 'app-ajout-livre',
  templateUrl: './ajout-livre.component.html',
  styleUrls: ['./ajout-livre.component.css']
})
export class AjoutLivreComponent {

  livreForm: FormGroup
  idLivre!: number;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private livresService: LivreService, private router: Router){
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

  onSubmit(){
    if(this.livreForm.invalid){
      return;
    }
    this.addLivre();

  }

  addLivre(){
    this.livresService.addLivre(this.livreForm.value).subscribe(response => {
      this.successMessage = 'livre ajouté!!!';
      this.router.navigate(['/livres']);
    });
  }
}
