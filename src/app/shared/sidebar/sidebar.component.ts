import { Component, OnInit } from "@angular/core";
import { SidebarService } from "../../services/service.index";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  constructor(public sideBarService: SidebarService) {}

  ngOnInit(): void {}
}
