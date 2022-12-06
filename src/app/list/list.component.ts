import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  limit = 50;
  offset = 0;
  list: any[] = [];

  constructor( private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.get( this.offset, this.limit )
      .pipe(
        untilDestroyed(this),
        tap(
          (res) => {
            this.list = res.results;
          }
        )
      )
      .subscribe()
  }

}
