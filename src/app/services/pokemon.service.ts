import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonUrl = environment.apiPrefix + 'pokemon/';

  constructor( private http: HttpClient ) { }

  get( offset: number, limit: number ): Observable<any> {
    let httpParams = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);

    return this.http.get(`${this.pokemonUrl}`, {params: httpParams});
  }
}
