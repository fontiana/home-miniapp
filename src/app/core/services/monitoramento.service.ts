import { Injectable } from "@angular/core";
import { GoogleTagManagerService } from "angular-google-tag-manager";
 
/**
 * Usada para registrar os logs de monitoramento do GTM.
 * O nome dos métodos e parâmetros são similares aos nomes que recebemos no documento de especificação.
 *
 */
 
@Injectable({
  providedIn: "root",
})
export class MonitoramentoService {
  constructor(private gtmService: GoogleTagManagerService) {}
 
  logPageView(url: string, title: string) {
    const gtmTag = {
      event: "VirtualPageview",
      virtualPageURL: url,
      virtualPageTitle: title,
    };
    this.gtmService.pushTag(gtmTag);
    // console.log(gtmTag); // Usado para teste local
  }
 
  logInteraction(action: string, label: string) {
    const gtmTag = {
      event: "interaction",
      EvAction: action,
      EvLabel: label,
    };
    this.gtmService.pushTag(gtmTag);
    // console.log(gtmTag); // Usado para teste local
  }
}
 