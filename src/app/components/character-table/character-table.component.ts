import { Component } from '@angular/core';
import { CharacterCardComponent } from "../character-card/character-card.component";
import { Character } from '../../interfaces/character';
import { RicknmortyapiService } from '../../services/ricknmorty.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ButtonNextComponent } from '../button-next/button-next.component';

@Component({
  selector: 'CharactersTable',
  standalone: true,
  imports: [CharacterCardComponent, CommonModule, HttpClientModule],
  templateUrl: './character-table.component.html',
  styleUrl: './character-table.component.css'
})
export class CharactersTableComponent {
  hasNextPage: boolean = false;
  hasPreviousPage: boolean = false;
  characters: Character[] = [];
  loading = true; // Indicador de carga
  error: string | null = null;

  constructor(private api: RicknmortyapiService) { }

  ngOnInit(): void {
    this.fetchCharacters();
  }

  fetchCharacters(): void {
    this.api.getFirstPage().subscribe({
      next: (response) => {
        this.characters = response.results; // Guardar los personajes
        this.loading = false; // Detener el indicador de carga

        this.hasPreviousPage = response.info.prev ? true : false;
        this.hasNextPage = response.info.next ? true : false;
        
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load characters';
        this.loading = false;
      },
    });
  }

  fetchNextPage(): void {
    this.api.getNextPage().subscribe({
      next: (response) => {
        this.characters = response.results; // Guardar los personajes
        this.loading = false; // Detener el indicador de carga

        this.hasPreviousPage = response.info.prev ? true : false;
        this.hasNextPage = response.info.next ? true : false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load characters';
        this.loading = false;
      },
    });
  }

  fetchPreviousPage(): void {
    this.api.getPreviousPage().subscribe({
      next: (response) => {
        this.characters = response.results; // Guardar los personajes
        this.loading = false; // Detener el indicador de carga

        this.hasPreviousPage = response.info.prev ? true : false;
        this.hasNextPage = response.info.next ? true : false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load characters';
        this.loading = false;
      },
    });
  }
}
