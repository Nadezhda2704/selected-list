import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonUrl = environment.apiPrefix + 'pokemon/';
  private localStorage: Storage;

  favorites$ = new BehaviorSubject([]);

  constructor( private http: HttpClient ) {
    this.localStorage = window.localStorage;

    this.initFavorites();
  }

  get( offset: number, limit: number ): Observable<any> {
    let httpParams = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);

    return this.http.get(`${this.pokemonUrl}`, {params: httpParams});
  }

  getFavorites() {
    return JSON.parse(`${this.localStorage.getItem('favorites')}`);
  }

  updateFavoritesList(name: string): void {
    const favorites = this.getFavorites();
    const isUnic = !favorites.includes(name);

    if(isUnic) {
      favorites.push(name);
      this.favorites$.next(favorites);
      this.localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  initFavorites(): void {
    if( this.getFavorites()?.length) {
      this.favorites$.next(this.getFavorites());
    } else {
      this.localStorage.setItem('favorites', JSON.stringify([]));
    }
  }
}
