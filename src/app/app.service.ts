import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Log {
  message: string;
  number: number;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _showModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  showModal$ = this._showModal.asObservable();
  logsSubject: BehaviorSubject<Log[]> = new BehaviorSubject<Log[]>([]);
  constructor() {}

  toggleModal() {
    this._showModal.next(!this._showModal.value);
  }

  addLog(log: Log) {
    const currentLogs = this.logsSubject.value;
    const updatedLogs = [...currentLogs, log];
    this.logsSubject.next(updatedLogs);
  }

  closeModal() {
    this._showModal.next(false);
  }
  openModal() {
    this._showModal.next(true);
  }
  limparLogs() {
    this.logsSubject.next([]); // Redefine o array de logs para um array vazio
  }
}
