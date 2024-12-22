import { NgModule } from '@angular/core';

import { TablerIconsModule } from 'angular-tabler-icons';
import {
  IconSearch,
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconMenu2,
  IconChevronCompactDown,
} from 'angular-tabler-icons/icons';

// Select some icons (use an object, not an array)
const icons = {
  IconSearch,
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconMenu2,
  IconChevronCompactDown,
};

@NgModule({
  declarations: [],
  imports: [TablerIconsModule.pick(icons)],
  exports: [TablerIconsModule],
})
export class IconsModule {}
