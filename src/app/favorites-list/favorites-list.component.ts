import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {
  favoritesList: any = [];

  constructor( private pokemonService: PokemonService) {

  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.pokemonService.favorites$.pipe(
      untilDestroyed(this),
      tap(
        (res) => {
          this.favoritesList = res;
        }
      )
    ).subscribe()
  }
}
