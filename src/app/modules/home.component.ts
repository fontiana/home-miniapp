import { Component, OnInit } from "@angular/core";
import { AppConfigService } from "@app/core/services/app-config.service";
import { bridgeInvoker } from "@app/shared/utils/bridgeInvoker";

declare let LiquidCorp: any;
 
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: [],
})
export class HomeComponent implements OnInit {
  constructor(private appConfigService: AppConfigService) {
    bridgeInvoker("setActionBarBack", this.appConfigService.device);
  }
 
  ngOnInit(): void {}
 
  voltar(): void {
    const urlRetorno =
      this.appConfigService.info.urlAPI +
      `bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/${this.appConfigService.storageHome.value?.dados.id}/redirecionamentos/HOME`;
    window.location.href = urlRetorno;
  }
}