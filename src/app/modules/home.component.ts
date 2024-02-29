import { Component, OnInit } from '@angular/core';

declare let LiquidCorp: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent implements OnInit {
  service: any;

  ngOnInit(): void {
    const targetSelector = '#drag1'; // ou .classe
    const myDropCallback = (e: any) => {
      console.info(
        '[personalizar.component.ts]',
        'Callback de drag para alterar as listas'
      );
    };
    const clickCallback = (e: any) => {
      console.log('clickCallback', e);
    };
    let timeoutDrag: any = null;
    const myCallTouchstart = (e: any) => {
      timeoutDrag = setTimeout(() => {
        console.log('touchStart');
        e.container.dataset.draggable = true;
        this.service.markDrag();
      }, 700);
    };
    const mycallTouchmove = (e: any) => {
      if (timeoutDrag) {
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
      myCallTouchstart,
      mycallTouchmove,
      mycallTouchend,
    };
    const service = LiquidCorp.BradDragAndDropService.getInstance(options);
  }
}
