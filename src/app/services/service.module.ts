import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  SharedService,
  SettingsService,
  SidebarService,
} from "./service.index";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [SharedService, SettingsService, SidebarService],
})
export class ServiceModule {}
