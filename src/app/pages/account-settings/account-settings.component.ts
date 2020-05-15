import { Component, OnInit, Inject } from "@angular/core";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
})
export class AccountSettingsComponent implements OnInit {
  constructor(public settingsService: SettingsService) {}

  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {
    this.aplicarCheck(link);
    this.settingsService.aplicarTema(tema);
  }

  aplicarCheck(link: any) {
    let selectores: any = document.getElementsByClassName("selector");
    for (let ref of selectores) {
      ref.classList.remove("working");
    }

    link.classList.add("working");
  }

  colocarCheck() {
    let tema = this.settingsService.ajustes.tema;
    let selectores: any = document.getElementsByClassName("selector");
    for (let ref of selectores) {
      if (ref.getAttribute("data-theme") === tema) {
        ref.classList.add("working");
        break;
      }
    }
  }
}
