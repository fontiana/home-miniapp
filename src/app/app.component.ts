import { Component, OnInit } from '@angular/core';
import { AppService, Log } from './app.service';
import { Observable } from 'rxjs';

declare let LiquidCorp: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'miniapp';
  logs$!: Observable<Log[]>;

  constructor(public appService: AppService) {}
  ngOnInit(): void {
    this.logs$ = this.appService.logsSubject.asObservable();
  }
  closeModal() {
    this.appService.toggleModal();
  }

}
