import { Component, Input } from '@angular/core';
import { Character } from '../../interfaces/character';

@Component({
  selector: 'app-character-card',
  standalone: true,
 
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css'
})
export class CharacterCardComponent {
  @Input() character!: Character;


}
