import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {

  constructor(private http: HttpClient) { }

  getSuperheroes(page: any){
    return this.http.get('https://ea1w717ym2.execute-api.us-east-1.amazonaws.com/api/heroes?page='+page);
  }

  viewSuperHeroe(id: any){
    return this.http.get('https://ea1w717ym2.execute-api.us-east-1.amazonaws.com/api/hero?id='+id);
  }

}
