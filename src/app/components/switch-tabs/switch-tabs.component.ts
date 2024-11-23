import { Component, Output, EventEmitter,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-switch-tabs',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './switch-tabs.component.html',
  styleUrl: './switch-tabs.component.css'
})
export class SwitchTabsComponent {
  @Input() tabs: string[] = [];
  selectedTab: string = this.tabs[0];  // Pestaña seleccionada por defecto
  @Output() tabSelected: EventEmitter<string> = new EventEmitter<string>();

  ngOnChanges() {
    // Asegurar que la pestaña seleccionada siempre sea una de las opciones proporcionadas
    if (!this.tabs.includes(this.selectedTab)) {
      this.selectedTab = this.tabs[0];
    }
  }

  onTabClick(tab: string) {
    this.selectedTab = tab;
    this.tabSelected.emit(tab);
  }

}
