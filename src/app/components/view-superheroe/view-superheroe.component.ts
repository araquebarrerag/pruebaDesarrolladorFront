import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { SuperheroesService } from '../../services/superheroes.service';

@Component({
  selector: 'app-view-superheroe',
  imports: [MatDialogTitle, MatDialogContent, CommonModule],
  templateUrl: './view-superheroe.component.html',
  styleUrl: './view-superheroe.component.css'
})
export class ViewSuperheroeComponent implements OnInit{

  //Creamos el dialogRef del modal que tenemos abierto
  public dialogRef = inject(MatDialogRef<ViewSuperheroeComponent>);
  //Creamos la variable que nos va a traer los datos que enviamos desde la pantalla padre para al momento de editar
  public data = inject<any>(MAT_DIALOG_DATA);
  //Creamos la variable donde vamos a guardar los datos del heroe
  public heroe: any;
  //Cremos una variable la cual va a esperar que se cargue los datos del heroe antes de mostrarlos en pantalla
  public load = false;

  constructor(
    private superheroesService: SuperheroesService
  ){}

  ngOnInit(): void {
    this.getData(this.data);
  }

  getData(id: any){
    this.superheroesService.viewSuperHeroe(id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.heroe = data;
      },
      complete: () => {
        this.load = true;
      },
      error:(error: any) => {
          console.log(error)
      },
    });
  }

  close():void {
    this.dialogRef.close();
  }
}
