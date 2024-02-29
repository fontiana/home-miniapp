import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AppService } from 'src/app/app.service';

export interface Card {
  id: string;
  title: string;
  icone: string;
  link: string;
  version?: string;
  news?: boolean;
  showed?: boolean;
  index?: number;
}

export interface SnackBar {
  style: string;
  text: string;
  analyticElementName: string;
}

declare let LiquidCorp: any;
@Component({
  selector: 'app-organism-personalizar',
  templateUrl: './personalizar.component.html',
  styleUrls: ['./personalizar.component.css'],
})
export class PersonalizarComponent implements AfterViewInit, OnInit {
  service: any;
  cardsPersonalizar: Array<any> = [];
  blankSpacesInFavorites: number = 0;
  isIosWithoutBt: boolean = false;

  cards: Array<any> = mockCards;
  @Output() saveClick: EventEmitter<any> = new EventEmitter();
  @Output() emitSnackbar: EventEmitter<any> = new EventEmitter();

  // Eventos de feedback para o usuario
  @Output() emitSaveSuccess: EventEmitter<any> = new EventEmitter();
  @Output() emitAddedSuccess: EventEmitter<any> = new EventEmitter();
  @Output() emitRemovedSuccess: EventEmitter<any> = new EventEmitter();

  //Tagueamento cards movidos
  cardsMovidos: number[] = [];
  cardsOrdenadosTagueamento: number[] = [];

  // 5401: Enviar para o GA a personalização do usuário
  cardsInitial: number[] = [];

  constructor(public appService: AppService) {}

  public changedLists(): void {
    console.info('[personalizar.component.ts]', '(changedLists)');
    this.appService.addLog({
      message: '[personalizar.component.ts] (changedLists)',
      number: 60,
    });
  }

  // Responsavel por normalizar posicionamento/atributos/childs para as listas após uma alteração
  public normalizePositions(orders: Array<string | null>[]): void {
    if (orders.every((list) => Array.isArray(list)) === false) return;

    const favorites = orders[0];
    const services = orders[1];

    this.cardsPersonalizar.forEach((card) => {
      const INDEX_FAVORITES = favorites.findIndex(
        (favorite) => favorite === card.id
      );
      const INDEX_SERVICES = services.findIndex(
        (favorite) => favorite === card.id
      );

      const ON_FAVORITES = INDEX_FAVORITES !== -1;

      card.container = ON_FAVORITES ? 0 : 1;
      card.position = ON_FAVORITES ? INDEX_FAVORITES : INDEX_SERVICES;
    });
  }

  public clickHandler(e: any): void {
    const userOrder = this.service.getResult();
    const coordinateTarget = this.service.findCoordinate(e.target);
    const coordinateTo = { indexContainer: 0, index: 0 };

    if (coordinateTo.indexContainer == coordinateTarget.indexContainer) {
      coordinateTo.indexContainer = 1;
    }

    this.appService.addLog({
      message: `coordinateTo ${coordinateTo.indexContainer}`,
      number: 94,
    });

    const temEspacoEmBranco =
      userOrder[0].find((x: string) => x === null) !== undefined;

    if (coordinateTo.indexContainer === 0 && !temEspacoEmBranco) {
      const snackBarModel: SnackBar = {
        style: 'warning',
        text: 'Pra personalizar, adicione e remova os serviços da área Favoritos. Após escolher 7 itens, toque em Salvar.',
        analyticElementName: 'tentativa-incluir-mais-de-sete-favoritos',
      };

      this.emitSnackbar.emit(snackBarModel);
      return;
    }
    // get the fisrt emptySpace from favorites | reserve
    coordinateTo.index = this.service.getFirstSlotEmptyIndex(
      userOrder[coordinateTo.indexContainer]
    );

    const willChangeContainer =
      coordinateTo.indexContainer !== coordinateTarget.indexContainer;
    this.revealSlots(coordinateTo, willChangeContainer);
    //  Moving for the fisrt blanckSpace
    this.service.moveFromTo(coordinateTarget, coordinateTo);
    this.service.animate();
    // if you'll going to down the index must be one, in this case they shouldn't hide
    this.hideSlots(coordinateTo);

    const newOrder = this.service.getResult();
    const espacosEmBrancoDepoisAlteracao = newOrder[0].filter(
      (x: string) => x === null
    );
    this.blankSpacesInFavorites =
      espacosEmBrancoDepoisAlteracao == undefined
        ? 0
        : espacosEmBrancoDepoisAlteracao.length;

    console.info(
      '[personalizar.component.ts]',
      'Callback de click para alterar as listas'
    );
    this.appService.addLog({
      message: 'Callback de click para alterar as listas',
      number: 137,
    });

    // Normaliza o posicionamento dos cards
    this.normalizePositions(newOrder);

    // Emite um evento ao ver-mais, identificar o tipo de ação
    const ACTION_TYPE = Number(coordinateTarget.indexContainer);
    const EMPTY_CARDS = espacosEmBrancoDepoisAlteracao.length;

    this.changedLists();

    switch (ACTION_TYPE) {
      case 0:
        this.emitRemovedSuccess.emit(EMPTY_CARDS);
        break;
      case 1:
        this.emitAddedSuccess.emit(EMPTY_CARDS);
    }
  }

  /**
  Caso swap para container mais serviços, revelar slot antes da animação
  */
  revealSlots(
    coordinateTo: { indexContainer: number; index: number },
    willChangeContainer: boolean
  ) {
    if (coordinateTo.indexContainer == 1 && willChangeContainer) {
      const elementCoordinateTo = document.querySelector<HTMLElement>(
        `.brad-drag-and-drop__slot[hidden]`
      );
      if (elementCoordinateTo) elementCoordinateTo.hidden = false;
    }
  }

  /**
  Esconder slot vazio após swap para container favoritos
  */
  hideSlots(coordinateTo: { indexContainer: number; index: number }) {
    if (coordinateTo.indexContainer == 0) {
      this.appService.addLog({
        message: 'hideSlots',
        number: 187,
      });

      let userOrder = this.service.getResult();
      const dataIndex = this.service.getFirstSlotEmptyIndex(userOrder[1]);
      const elementCoordinateTarget = document.querySelector(
        `.brad-drag-and-drop__slot[data-index="${dataIndex}"]`
      ) as HTMLElement;
      setTimeout(() => (elementCoordinateTarget.hidden = true), 600);
    }
  }

  handlePersonalization() {
    let userOrder = this.service.getResult();
    const hasBlankSpace =
      userOrder[0].find((x: string) => x === null) !== undefined;
    if (hasBlankSpace) {
      const snackBarModel: SnackBar = {
        style: 'warning',
        text: 'Pra salvar, é preciso ter 7 serviços nos seus favoritos',
        analyticElementName: 'tentativa-salvar-sem-escolher-sete-favoritos',
      };

      this.emitSnackbar.emit(snackBarModel);
      return;
    }
    let concatArrIdCards: string[] = userOrder[0].concat(userOrder[1]);

    //Ordena os ids com base no title do card
    const arrayCardsOrdenados = concatArrIdCards
      .map((item: string) => this.cards.find((card) => card.id === item))
      .filter((item): item is Card => Boolean(item));

    userOrder[1] = arrayCardsOrdenados
      .slice(7)
      .sort((cardA, cardB) => cardA.title.localeCompare(cardB.title))
      .map((card) => card.id);

    //Atualizo os ids cocatenados com a ordenção correta
    concatArrIdCards = userOrder[0].concat(userOrder[1]);
    this.saveClick.emit(concatArrIdCards);
    this.service.updateByIds(userOrder);
    this.service.animate();

    // @GA:
    const list: string[] = userOrder[0];

    const ids = list
      .map((id) => this.cards.find((item) => item.id === id))
      .filter((item) => item && item.index)
      .map((item) => item.index);

    const added = ids.filter((id) => this.cardsInitial.includes(id) === false);
    const removed = this.cardsInitial.filter(
      (id) => ids.includes(id) === false
    );

    const addedString = added.sort((a, b) => a - b).join('-');
    const removedString = removed.sort((a, b) => a - b).join('-');

    console.info(
      '[personalizar.component.ts]',
      '(handlePersonalization)',
      'Pegando a diferença realizada pelo usuario para enviar pro Analytics:',
      { added, removed, addedString, removedString }
    );

    this.cardsInitial = ids;
  }

  ngOnInit(): void {
    console.info('[personalizar.component.ts]', '(ngOnInit)');

    this.cardsInitial = this.cards.slice(0, 7).map((item) => item.index);

    // Construção inicial de posicionamento
    this.cardsPersonalizar = this.cards.map((card, index) => ({
      container: index < 7 ? 0 : 1,
      position: index < 7 ? index : index - 7,
      ...card,
    }));

    this.cardsOrdenadosTagueamento = this.cards
      .map((card) => card.title)
      .sort((a, b) => a.localeCompare(b));
  }

  ngAfterViewInit(): void {
    const targetSelector = '#drag1'; // ou .classe

    console.info('[personalizar.component.ts]', '(ngAfterViewInit)');

    const clickCallback = (e: any) => {
      console.log('clickCallback', e);
      this.appService.addLog({ message: 'clickCallback', number: 271 });
    };

    const myDropCallback = (e: any) => {
      // this event is called when liquid detect any drag event from
      this.service.moveFromTo(e.coordDragging, e.coordSelected);
      const userOrder = this.service.getResult();
      const espacosEmBranco = userOrder[0].filter((x: string) => x === null);

      this.blankSpacesInFavorites =
        espacosEmBranco == undefined ? 0 : espacosEmBranco.length;

      console.info(
        '[personalizar.component.ts]',
        'Callback de drag para alterar as listas'
      );
      this.appService.addLog({
        message: 'Callback de drag para alterar as listas',
        number: 287,
      });

      // Normaliza o posicionamento dos cards
      this.normalizePositions(userOrder);
      this.revealSlots(e.coordSelected, e.willChangeContainer);
      this.service.animate();
      this.hideSlots(e.coordSelected);
    };

    let timeoutDrag: any = null;
    const mycallTouchstart = (e: any) => {
      console.log('abc')

      timeoutDrag = setTimeout(() => {
        this.appService.addLog({
          message: 'entrou no mycallTouchstart',
          number: 302,
        });
        e.container.dataset.draggable = true;
        this.service.markDrag();
      }, 700);
    };

    const mycallTouchmove = (e: any) => {
      if (timeoutDrag) {
        this.appService.addLog({
          message: 'entrou no mycallTouchmove',
          number: 309,
        });

        clearTimeout(timeoutDrag);
        timeoutDrag = null;
      }
    };

    const mycallTouchend = (e: any) => {
      console.log('TouchEnd');
      this.appService.addLog({
        message: 'entrou no mycallTouchend',
        number: 304,
      });

      if (timeoutDrag) {
        clearTimeout(timeoutDrag);
        timeoutDrag = null;
      }
      if (e.container) {
        e.container.dataset.draggable = false;
      }
    };

    const options = {
      targetSelector,
      dropCallback: myDropCallback,
      clickCallback,
      touchstartCallback: mycallTouchstart,
      touchmoveCallback: mycallTouchmove,
      touchendCallback:mycallTouchend,
    };
    this.service = LiquidCorp.BradDragAndDropService.getInstance(options);
    console.log(this.service)
  }

  validateClick(element: Element, e: any): void {
    e.stopPropagation();
    this.appService.addLog({
      message: 'entrou no validateClick',
      number: 287,
    });

    element.classList.add('z-index-animation');
    this.clickHandler(e);

    setTimeout(() => {
      element.classList.remove('z-index-animation');
    }, 1000);
  }
}

const mockCards = [
  {
    id: 'transferencia',
    index: 59,
    icone: 'transacional-transferencia',
    title: 'Transferências',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/TRANSFERENCIA',
  },
  {
    id: 'pix',
    index: 45,
    icone: 'pix-logo-outline',
    title: 'Pix',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/PIX',
  },
  {
    id: 'pagamentos',
    index: 46,
    icone: 'transacional-pagamento',
    title: 'Pagamentos',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/PAGAMENTOS',
  },
  {
    id: 'cartoes',
    index: 14,
    icone: 'cartao-debito-credito',
    title: 'Cartões',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/CARTOES_SSO_CARTOES',
  },
  {
    id: 'emprestimos',
    index: 28,
    icone: 'financial-dolar-add-outline-pdpj',
    title: 'Empréstimos/ Consignado',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/CONSIGNADO_LEGADO_NOVA_ARQ',
  },
  {
    id: 'investimentos',
    index: 36,
    icone: 'investimento-investimentos',
    title: 'Investimentos',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/INVESTIMENTOS_PORTFOLIO',
  },
  {
    id: 'recargas',
    index: 51,
    icone: 'transacional-recarga',
    title: 'Recargas',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/RECARGA_PRE_PAGO',
  },
  {
    id: 'agendamento',
    index: 1,
    icone: 'transacional-agendamento',
    title: 'Agendamentos',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/AGENDAMENTOS',
  },
  {
    id: 'agora-menu',
    index: 3,
    icone: 'brand-agora',
    title: 'Ágora Home Broker',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/AGORA_MENU',
  },
  {
    id: 'atualizacao-cadastral',
    index: 4,
    icone: 'account-account-switch',
    title: 'Atualização cadastral',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/ATUALIZACAO_CADASTRAL',
  },
  {
    id: 'autorizacao-de-parceiros',
    index: 5,
    icone: 'account-partner-approved',
    title: 'Autorização de parceiros',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/AUTORIZACAO_PARCEIROS',
  },
  {
    id: 'cambio',
    index: 10,
    icone: 'cambio-cambio',
    title: 'Câmbio',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/CAMBIO',
  },
  {
    id: 'capitalizacao',
    index: 11,
    icone: 'capitalizacao-trevo',
    title: 'Capitalização',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/CAPITALIZACAO',
  },
  {
    id: 'cesta-de-servicos',
    index: 15,
    icone: 'extrato-cesta-servicos',
    title: 'Cesta de serviços',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/CESTA_SERVICOS',
  },
  {
    id: 'cheques',
    index: 17,
    icone: 'transacional-cheque',
    title: 'Cheques',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/CHEQUES',
  },
  {
    id: 'comprovantes',
    index: 19,
    icone: 'extrato-recibo',
    title: 'Comprovantes',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/COMPROVANTES',
  },
  {
    id: 'consorcio',
    index: 20,
    icone: 'category-car-garage',
    title: 'Consórcio',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/CONSORCIO',
  },
  {
    id: 'conta-internacional',
    index: 21,
    icone: 'cambio-global',
    title: 'Conta internacional',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/ContaInternacional',
  },
  {
    id: 'nextjoy',
    index: 43,
    icone: 'brand-conta-next-joy',
    title: 'Conta nextjoy',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/NEXTJOY',
  },
  {
    id: 'credito-imobiliario',
    index: 22,
    icone: 'financial-house-money',
    title: 'Crédito imobiliário',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/CREDITO_IMOBILIARIO',
  },
  {
    id: 'dda',
    index: 23,
    icone: 'transacional-dda',
    title: 'DDA - boletos registrados',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/DDA',
  },
  {
    id: 'debito-automatico',
    index: 24,
    icone: 'transacional-debito-automatico',
    title: 'Débito automático',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/DEBITO_AUTOMATICO',
  },
  {
    id: 'debito-de-veiculos',
    index: 25,
    icone: 'financial-invoice-description',
    title: 'Débitos de veículos',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/DEBITO_VEICULOS',
  },
  {
    id: 'deposito-de-cheques',
    index: 26,
    icone: 'transacional-deposito-cheque',
    title: 'Depósito de cheques',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/DEPOSITO_CHEQUES',
  },
  {
    id: 'disneyplus-starplus',
    index: 18,
    icone: 'brand-disney-plus',
    title: 'Disney+ e Star+',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/COMBO_PLUS',
  },
  {
    id: 'fale-conosco-ouvidoria',
    index: 54,
    icone: 'contact-agent-sac',
    title: 'Fale conosco/ Ouvidoria',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/SAC_OUVIDORIA',
  },
  {
    id: 'financiamento-veiculos',
    index: 32,
    icone: 'financial-car',
    title: 'Financiamento de veículos',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/FINANCIAMENTO_VEICULOS',
  },
  {
    id: 'imposto-de-renda',
    index: 34,
    icone: 'extrato-ir',
    title: 'Imposto de renda',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/IMPOSTO_RENDA',
  },
  {
    id: 'meus-limites',
    index: 39,
    icone: 'financial-hand-setting',
    title: 'Limites de crédito',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/MEUS_LIMITES',
  },
  {
    id: 'meus-bancos',
    index: 38,
    icone: 'transacional-agency-money',
    title: 'Meus bancos',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/MEUS_BANCOS',
  },
  {
    id: 'mimos',
    index: 40,
    icone: 'category-gift-box-heart',
    title: 'Mimos',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/MIMOS',
  },
  {
    id: 'minhas-autorizacoes',
    index: 41,
    icone: 'filetype-confirmation',
    title: 'Minhas autorizações',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/MINHAS_AUTORIZACOES',
  },
  {
    id: 'my-account',
    index: 42,
    icone: 'account-my-account',
    title: 'My Account',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/MY_ACCOUNT',
  },
  {
    id: 'open-finance',
    index: 44,
    icone: 'brand-open-finance-custom',
    title: 'Open Finance',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/OPENBANKING',
  },
  {
    id: 'portabilidade-de-salario',
    index: 48,
    icone: 'transacional-portabilidade-salario',
    title: 'Portabilidade de salário',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/PORTABILIDADE_SALARIO',
  },
  {
    id: 'previdencia',
    index: 49,
    icone: 'category-pension',
    title: 'Previdência',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/PREVIDENCIA',
  },
  {
    id: 'provisionamento-de-saque',
    index: 50,
    icone: 'transacional-provisionamento-saque',
    title: 'Provisionamento de saque',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/PROVISIONAMENTO_SAQUE',
  },
  {
    id: 'registrato',
    index: 52,
    icone: 'filetype-registrato',
    title: 'Registrato',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/REGISTRATO',
  },
  {
    id: 'renegociacao-de-dividas',
    index: 53,
    icone: 'miscellaneous-handshake',
    title: 'Renegociação de dívidas',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/RENEGOCIACAO_DIVIDAS',
  },
  {
    id: 'extrato',
    index: 30,
    icone: 'extrato-recibo',
    title: 'Saldo e extrato',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/SALDO_EXTRATO',
  },
  {
    id: 'seguros',
    index: 55,
    icone: 'seguro-casa-auto',
    title: 'Seguros',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/SEGUROS',
  },
  {
    id: 'tag-de-pedagio',
    index: 58,
    icone: 'miscellaneous-tag-veloe',
    title: 'Tag pedágio',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/ContratacaoTagVeicularVeloe',
  },
  {
    id: 'whatsapp',
    index: 63,
    icone: 'contact-whatsapp',
    title: 'WhatsApp',
    link: 'app:https://api-leap-platca.neth.bradesco.com.br/bff-canais/bcpf_roteador/v1/bcpf-v1/clientes/self/contas/{idConta}/redirecionamentos/WHATSAPP_TRANSACIONAL_ANDROID',
  },
];
