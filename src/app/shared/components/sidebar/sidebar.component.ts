import { Component, HostListener } from '@angular/core';
import { Menu, NavservicesService } from '../../services/nav.service';
import { LayoutService } from '../../services/layout.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateDirective, TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { environment } from 'src/environments/environment.main';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule,TranslateModule,SvgIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  version = environment.version
  public menus = this.navService.Nvabarmenu;
  public mainMenu: boolean = false;
  public menuItem = {}
  public active: boolean = false;
  public screenWidth: number;
  public screenHeight: number;

  constructor(public navService: NavservicesService, public layout: LayoutService) { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  toggleMenu(item: Menu) {
    if (!item.active) {
      this.menus.forEach((a: Menu) => {
        if (this.menus.includes(item)) {
          a.active = false;
        }
        if (!a.children) {
          return false;
        }
        a.children.forEach((b: Menu) => {
          if (a.children?.includes(item)) {
            b.active = false;
          }
        });
        return;
      });
    }
    item.active = !item.active;
    if (item.active == true) {
      this.navService.isShow = true;
    } else {
      this.navService.isShow = false;
    }
  }

  toggle(item: Menu, mainMenu?: Menu) {
    if (!item.active) {
      this.menus.forEach((a: Menu) => {
        a.item?.forEach((child) => {
          if (a.item?.includes(item)) {
            child.active = false;
          }
          if (child.children) {
            child.children.forEach((subChild) => {
              if (child.children?.includes(item)) {
                subChild.active = false;
              }
            })
          }
        })
        return;
      });
    }
    item.active = !item.active;
    if (mainMenu) {
      mainMenu.active = false
      this.navService.isShow = false
    }
  }

}








