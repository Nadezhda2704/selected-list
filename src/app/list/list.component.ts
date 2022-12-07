import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, tap } from 'rxjs';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  formGroup: FormGroup = new FormGroup( {
    search: new FormControl( '' ),
  });

  limit = 50;
  offset = 0;
  list: any[] = [];
  listForShow: any[] = [];

  constructor( private pokemonService: PokemonService) { }

  get searchControl(): AbstractControl | null {
    return this.formGroup.get( 'search' );
  }

  ngOnInit(): void {
    this.getData();

    this.filterList();
  }

  getData() {
    this.pokemonService.get( this.offset, this.limit )
      .pipe(
        untilDestroyed(this),
        debounceTime(200),
        tap(
          (res) => {
            this.list = [ ...this.list, ...res.results ];
            this.listForShow = this.list;
          }
        )
      )
      .subscribe()
  }

  filterList() {
    this.searchControl?.valueChanges.pipe(
      untilDestroyed(this),
      tap(
        (res) => {
          this.listForShow = this.list.filter( (item)=> {
            return item.name.includes(res);
          } )
        }
      )
    ).subscribe()
  }

  more() {
    this.clearSearch();
    this.offset += this.limit;
    this.getData();
  }

  addToFavorites(name: string) {
    this.pokemonService.updateFavoritesList(name);
  }

  clearSearch() {
    this.searchControl?.setValue('');
  }
}
