import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { bridgeInvoker, sdkInvoker } from "@app/shared/utils/bridgeInvoker";
import {
  AppConfigService,
  StorageHome,
} from "@app/core/services/app-config.service";
import { GoogleTagManagerService } from "angular-google-tag-manager";

declare let LiquidCorp: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'miniapp';
  overlayService: any;
  segmento: string = "classic";
  urlRetorno: string = "";
  urlAtual: string = "";
  
  constructor(
    private appConfigService: AppConfigService,
    private router: Router,
    private gtmService: GoogleTagManagerService
  ) {
    this.router.events.forEach((item) => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: "page",
          pageName: item.url,
        };
        this.urlAtual = item.url;
        this.gtmService.pushTag(gtmTag);
      }
    });
    sdkInvoker("sdkStorage", "getUserSettings", ["lpInteg", "conta"]);
  }
 
  @HostListener("window:lpInteg-conta", ["$event.detail"])
  public getStorageDados(
    contas: Array<{
      id: string;
      dados: {
        id: string;
        agencia: number;
        conta: number;
        digito: number;
        titularidade: number;
      };
    }> = []
  ): void {
    console.log(contas);
    const [item] = contas;
 
    const {
      id,
      dados: { agencia, conta, digito, titularidade },
    } = item;
 
    const storageData = this.appConfigService.storageHome.value;
    this.appConfigService.storageHome.next({
      ...(storageData as StorageHome),
      dados: {
        id,
        agencia,
        conta,
        digito,
        titularidade,
      },
    });
 
    sdkInvoker("sdkStorage", "getUserSettings", ["segmento", "timestamp"]);
  }
 
  @HostListener("window:segmento-timestamp", ["$event.detail"])
  public getSegmento(raw: any) {
    console.log(raw);
    if (!raw) return;
 
    this.appConfigService.storageRaw.segmento = raw;
 
    const key = this.appConfigService.generateStorageKey();
    const data = raw[key] || {};
 
    const { segment, timestamp } = data;
    if (!segment) return;
 
    const storage = this.appConfigService.storageHome.value;
 
    const saveStorage: StorageHome = {
      ...(storage as StorageHome),
      segmento: segment,
      segmentoTimestamp: timestamp,
    };
 
    this.segmento = segment;
 
    return this.appConfigService.storageHome.next(saveStorage);
  }
 
  //Hostlisterner para "escutar" a ação da embarcada e trocar a URL
  @HostListener("window:voltar")
  voltar(): void {
    if (this.urlAtual === "/sessao-encerrada") {
      // sdkInvoker("sdkUI", "closeWebView");
    } else {
      this.urlRetorno =
        this.appConfigService.info.urlAPI +
        `bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/${this.appConfigService.storageHome.value?.dados.id}/redirecionamentos/HOME`;
      window.location.href = this.urlRetorno;
    }
  }
  
}
