import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-selected-list',
  templateUrl: './selected-list.component.html',
  styleUrls: ['./selected-list.component.scss']
})
export class SelectedListComponent implements OnInit {
  selectedList: any = [];

  constructor( private pokemonService: PokemonService) {

  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.pokemonService.selected$.pipe(
      untilDestroyed(this),
      tap(
        (res) => {
          this.selectedList = res;
        }
      )
    ).subscribe()
  }
}
