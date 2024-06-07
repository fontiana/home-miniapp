import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  tela: String = "inicio";
  error: String = "";

  private isReady = new BehaviorSubject<boolean>(false);
  private isReadySubscription = new Subscription();

  constructor() { }
  ngOnInit(): void {
    this.initLogin();
  }

  initLogin() {
    setTimeout(() => {
      console.log("Pronto!");
      // this.error = "ERRO!"
      this.isReady.next(true);
    }, 1000);
  }

  onSenha4() {
    this.isReadySubscription = this.isReady.subscribe(isReady => {
      if (isReady) {
        this.isReady.next(false);
        if (this.error !== "") {
          this.tela = "erro"
        } else {
          this.tela = "dispositivo"
        }
      }
    });
  }

  voltar() {
    this.initLogin();
    this.isReadySubscription.unsubscribe();
    this.tela = "inicio"
  }
}