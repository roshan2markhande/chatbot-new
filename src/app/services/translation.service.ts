import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en'); // Set default language
  }

  changeLanguage(language: string): void {
    this.translate.use(language);
  }

  getTranslation(key: string): string {
    return this.translate.instant(key);
  }
}
