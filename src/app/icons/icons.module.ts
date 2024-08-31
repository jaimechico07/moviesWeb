import { NgModule } from '@angular/core';


import { TablerIconsModule } from 'angular-tabler-icons';
import { IconSearch} from 'angular-tabler-icons/icons';

// Select some icons (use an object, not an array)
const icons = {
  IconSearch
};

@NgModule({
  declarations: [],
  imports: [
  TablerIconsModule.pick(icons)
  ],
  exports: [
    TablerIconsModule
  ]
})
export class IconsModule { }
