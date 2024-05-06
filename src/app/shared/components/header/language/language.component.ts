import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NavservicesService } from 'src/app/shared/services/nav.service';
import { getItem, setItem } from '@helpers/storage';
import { GLOBAL_VARIABLES } from '@core/variables.constants';

interface selectedlanguage {
  language?: string;
  code?: any;
  type?: string;
  icon?: string;
}
@Component({
  selector: 'app-language',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent {
  public language: boolean = false;

  public languages: selectedlanguage[] = [
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: 'us',
    },
    {
      language: 'Français',
      code: 'fr',
      icon: 'fr',
    },
  ];

  public selectedLanguage: selectedlanguage = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us',
  };

  constructor(
    public navServices: NavservicesService,
    private translate: TranslateService
  ) {
    const defaultLang = getItem(GLOBAL_VARIABLES.LANG) || GLOBAL_VARIABLES.FR;
     this.selectedLanguage = this.languages.find((lang) => lang.code === defaultLang) || this.selectedLanguage;
  }

  ngOnInit() {}

  changeLanguage(lang: selectedlanguage) {
    setItem(GLOBAL_VARIABLES.LANG, lang.code);
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
  }
}
