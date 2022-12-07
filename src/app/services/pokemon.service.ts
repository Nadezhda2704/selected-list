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

  selected$ = new BehaviorSubject([]);

  constructor( private http: HttpClient ) {
    this.localStorage = window.localStorage;

    this.initSelected();
  }

  get( offset: number, limit: number ): Observable<any> {
    let httpParams = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);

    return this.http.get(`${this.pokemonUrl}`, {params: httpParams});
  }

  getSelected() {
    return JSON.parse(`${this.localStorage.getItem('selected')}`);
  }

  updateSelectedList(name: string): void {
    const selected = this.getSelected();
    const isUnic = !selected.includes(name);

    if(isUnic) {
      selected.push(name);
      this.selected$.next(selected);
      this.localStorage.setItem('selected', JSON.stringify(selected));
    }
  }

  initSelected(): void {
    if( this.getSelected()?.length) {
      this.selected$.next(this.getSelected());
    } else {
      this.localStorage.setItem('selected', JSON.stringify([]));
    }
  }
}
