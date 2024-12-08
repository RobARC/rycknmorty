import { Component } from '@angular/core';
import { RicknmortyapiService } from '../../services/ricknmorty.service';
import { Character } from '../../interfaces/character';

@Component({
  selector: 'app-button-next',
  standalone: true,
  imports: [],
  templateUrl: './button-next.component.html',
  styleUrl: './button-next.component.css'
})
export class ButtonNextComponent {
  characters: Character[] = [];
  hasNextPage = false;
  hasPreviousPage = false;

  constructor(private api: RicknmortyapiService) { }

  goToNextPage(): void {
    this.api.getNextPage().subscribe(response => {
      this.characters = response.results;
      this.hasNextPage = !!response.info.next;
      this.hasPreviousPage = !!response.info.prev;
    });
  }
}
