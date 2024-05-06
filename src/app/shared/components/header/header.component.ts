import { Component, HostListener, inject } from '@angular/core';
import { Menu, NavservicesService } from '../../services/nav.service';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';
import { LanguageComponent } from './language/language.component';
import { CustomMenuComponent } from './custom-menu-item/custom-menu.component';
import { StatusComponent } from './status/status.component';
import { SocketService } from '@shared/services/socket.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    FormsModule,
    RouterModule,
    ProfileComponent,
    BookmarkComponent,
    MessageComponent,
    NotificationComponent,
    LanguageComponent,
    CustomMenuComponent,
    StatusComponent,
    SvgIconComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  _socket = inject(SocketService);
  public menuItems: Menu[] = [];
  public items: Menu[] = [];

  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public text: string = '';
  public open: boolean = false;
  public show: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: number) {
    this.navService.isDisplay = window.innerWidth < 1200 ? true : false;
  }

  constructor(public navService: NavservicesService) {
    this.navService.items.subscribe((menuItems) => (this.items = menuItems));
  }

  openSearch() {
    this.open = !this.open;
  }

  openMenu() {
    this.navService.isDisplay = !this.navService.isDisplay;
  }

  languageToggle() {
    this.navService.language = !this.navService.language;
  }

  searchToggle() {
    this.navService.search = false;
    document.getElementsByTagName('body')[0].classList.remove('offcanvas');
  }

  searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) return (this.menuItems = []);
    let items: Menu[] = [];
    term = term.toLowerCase();
    this.items.forEach((data) => {
      data.item?.filter((menuItems: any) => {
        if (
          menuItems.title?.toLowerCase().includes(term) &&
          menuItems.type === 'link'
        ) {
          items.push(menuItems);
        }
        menuItems.children?.filter((subItems: any) => {
          if (
            subItems.title?.toLowerCase().includes(term) &&
            subItems.type === 'link'
          ) {
            subItems.icon = menuItems.icon;
            items.push(subItems);
          }
          subItems.children?.filter((suSubItems: any) => {
            if (suSubItems.title?.toLowerCase().includes(term)) {
              suSubItems.icon = menuItems.icon;
              items.push(suSubItems);
            }
          });
          return;
        });
        this.checkSearchResultEmpty(items);
        this.menuItems = items;
      });
    });
    return;
  }

  clickOutside(): void {
    this.searchResult = false;
    this.searchResultEmpty = false;
  }

  checkSearchResultEmpty(items: Menu[]) {
    if (!items.length) this.searchResultEmpty = true;
    else this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    document.body.classList.add('offcanvas');
  }

  removeFix() {
    this.searchResult = false;
    this.text = '';
    document.body.classList.remove('offcanvas');
  }
}
