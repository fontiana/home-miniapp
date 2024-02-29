import { Component, OnInit } from '@angular/core';
declare let LiquidCorp: any;

declare global {
  interface Window {
    clickRemove: (element: Element, event: MouseEvent) => void;
  }
}

@Component({
  selector: 'app-drag-and-drop2',
  templateUrl: './drag-and-drop2.component.html',
  styleUrls: ['./drag-and-drop2.component.css'],
})
export class DragAndDrop2Component implements OnInit {
  service: any;
  constructor() {
    // Torna a função clickRemove globalmente acessível
    window['clickRemove'] = this.clickRemove.bind(this);
  }
  ngOnInit(): void {
    const targetSelector = '#drag1'; // ou .classe
    const myDropCallback = (e: any) => {
      console.info(
        '[personalizar.component.ts]',
        'Callback de drag para alterar as listas'
      );
    };
    const clickCallback = (e: any) => {
      console.log('clickCallback [callback ativo se drag = true', e);
    };
    let timeoutDrag: any = null;
    const mycallTouchstart = (e: any) => {
      timeoutDrag = setTimeout(() => {
        console.log('touchStart');
        e.container.dataset.draggable = true;
        this.service.markDrag();
      }, 700);
    };
    const mycallTouchmove = (e: any) => {
      if (timeoutDrag) {
        console.log('touchStart');
        clearTimeout(timeoutDrag);
        timeoutDrag = null;
      }
    };
    const mycallTouchend = (e: any) => {
      console.log('TouchEnd');
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
      myDropCallback,
      clickCallback,
      mycallTouchstart,
      mycallTouchmove,
      mycallTouchend,
    };
    this.service = LiquidCorp.BradDragAndDropService.getInstance(options);
  }

  clickRemove(element: Element, event: any) {
    console.log('clickRemove event disparado se drag  = false', event);
    console.log('clickRemove element', element);
    console.log('clickRemove element', element);
    this.clickHandler(event);
  }

  clickHandler(e: any) {
    e.stopPropagation();

    //coordenada do elemento clicado
    let coordinateTarget = this.service.findCoordinate(e.target);
    //coordenada do destino, irá para o primeiro container no começo da lista
    let coordinateTo = { indexContainer: 0, index: 0 };

    //irá ao um container diferente do target
    if (coordinateTo.indexContainer == coordinateTarget.indexContainer) {
      coordinateTo.indexContainer = 1;
    }

    //funcao com a lógica de mudar o destino do elemento para o primeiro slot disponível, e caso não exista slots diponíveis, troca com o primeiro elemento.
    this.firstEmptySlot(coordinateTo);

    //efetua a mudança
    this.service.moveFromTo(coordinateTarget, coordinateTo);

    //faz a transição
    this.service.animate();
  }

  firstEmptySlot(coord: any) {
    //pega o array dos posicionamentos dos elementos
    let result = this.service.getResult();

    //pega o index do primeiro slot vazio do container especificado no parâmetro
    let indexFirstEmptySlot = this.service.getFirstSlotEmptyIndex(
      result[coord.indexContainer]
    );

    //caso o index do slot vazio for -1 quer dizer que não existe slots vazios, caso isso ocorra deixamos 0.
    indexFirstEmptySlot = indexFirstEmptySlot != -1 ? indexFirstEmptySlot : 0;

    //atualiza o index da coordenada
    coord.index = indexFirstEmptySlot;
  }
}
