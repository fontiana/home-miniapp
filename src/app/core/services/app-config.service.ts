import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
 
// Aqui declaramos a variável criada no app-config.js
declare let appConfig: any;
 
interface IAppConfig {
  urlAPI: string;
  urlFedLogon: string;
}
 
export interface HomeDados {
  id: string;
  agencia: number;
  conta: number;
  digito: number;
  titularidade: number;
}
export interface StorageHome {
  segmento: string | false;
  segmentoTimestamp: string | undefined;
  dados: HomeDados;
}
 
type Raw<T> = {
  [key: string]: T;
};
 
type StorageRaw = {
  segmento?: Raw<{ segment: string; timestamp: string }>;
};
 
@Injectable({
  providedIn: "root",
})
export class AppConfigService {
  // valores padrão considerando caminho relativo.
  info: IAppConfig = {
    urlAPI: "/",
    urlFedLogon: "",
  };
 
  constructor() {
    this.init();
    this.setDevice(window.navigator.userAgent);
  }
 
  /**
   * Indica o device do cliente
   */
  device: string = "";
 
  setDevice(userAgent: string) {
    if (userAgent.includes("Linux")) {
      this.device = "android";
    } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
      this.device = "iphone";
    } else {
      this.device = "";
    }
  }
 
  public storageRaw: StorageRaw = {};
 
  // Armazenamento de dados da home no Storage do nativo
  public storageHome = new BehaviorSubject<StorageHome | undefined>(undefined);
 
  public generateStorageKey(): string {
    const storage = this.storageHome.value;
    const dados = storage && storage.dados;
 
    const { agencia, conta, digito, titularidade } = dados || {};
 
    return `${agencia}/${conta}-${digito}/${titularidade}`;
  }
 
  /**
   * Serviço para recuperar configurações externas ao build do projeto.
   */
  init(): any {
    try {
      this.info = appConfig as IAppConfig;
    } catch (erro) {
      // tenta usar o caminho padrão
    }
  }
}