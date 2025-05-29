import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperheroesService } from '../../services/superheroes.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ViewSuperheroeComponent } from '../view-superheroe/view-superheroe.component';

@Component({
  selector: 'app-list-superheroes',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './list-superheroes.component.html',
  styleUrl: './list-superheroes.component.css'
})
export class ListSuperheroesComponent implements OnInit{

  public load: boolean = false;
  public superheroes: any[] = [];
  public pages: any[] = [];
  public actualPage = 0;
  public endPage = 0;
  public dialog = inject(MatDialog);

  heroeForm = new FormGroup({
    FilterTests: new FormControl('')
  })

  constructor(
    private superheroesService: SuperheroesService
  ){}

  ngOnInit(): void {
    this.loadSuperheroes(1);
  }

  loadSuperheroes(page: any){
    this.superheroesService.getSuperheroes(page).subscribe({
      next: (data: any) => {
        this.actualPage = data.page;
        this.endPage = data.lastPage;
        for(let i = 1; i <= data.lastPage; i++){
          this.pages[i] = i;
        }
        this.superheroes = data.items;
      },
      complete: () => {
        this.load = true;
      },
      error: (error: any) => {
        console.log(error);
        this.load = true;
      }
    });
  }

  view(heroe: any): void {
    const dialogRef = this.dialog.open(ViewSuperheroeComponent,{
      data: heroe.id,
      width: '80%',
      maxWidth: '1000px'
    });
  }

  next(): void{
    if(this.actualPage != this.endPage){
      this.load = false;
      this.loadSuperheroes(this.actualPage + 1);
    }
  }

  back(): void{
    if(this.actualPage != 1){
      this.load = false;
      this.loadSuperheroes(this.actualPage - 1);
    }
  }

  mostrar(page: any): void{
    this.load = false;
    this.loadSuperheroes(page);
  }

}
