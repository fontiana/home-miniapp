import { Component, OnInit } from "@angular/core";

declare let LiquidCorp: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: [],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    const targetSelector = "#drag1"; // ou .classe
    const options = { targetSelector };
    const service = LiquidCorp.BradDragAndDropService.getInstance(options);
  }
}
