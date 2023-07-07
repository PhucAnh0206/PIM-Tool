import { TranslateService } from "@ngx-translate/core";
import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "pim-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  constructor(public translate: TranslateService) {
    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang("en");
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  getLanguageButtonText(lang: string): string {
    // Provide custom text for each language
    switch (lang) {
      case "en":
        return "EN";
      case "fr":
        return "FR";
      // Add cases for other languages as needed
      default:
        return lang;
    }
  }
}
