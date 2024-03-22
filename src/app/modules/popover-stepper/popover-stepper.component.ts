import { AfterViewInit, Component } from '@angular/core';
declare let LiquidCorp: any;

@Component({
  selector: 'app-popover-stepper',
  templateUrl: './popover-stepper.component.html',
  styleUrls: ['./popover-stepper.component.css'],
})
export class PopoverComponent implements AfterViewInit {
  overlayService: any;
  popoverService: any;
  selectedOption: string = '1';

  ngAfterViewInit() {
    this.popoverService = LiquidCorp.BradPopoverService.getInstance({
      id: 'popover-151',
      idTarget: 'target-345',
      list: this.list,
      currentItem: this.list[0],
      direction: 'bottom',
      idOverlay: 'myCanvas',
    });

    this.overlayService = LiquidCorp.BradOverlayService.getInstance({
      id: 'myCanvas',
      color: 'brad-bg-overlay-60',
    });
    console.log(this.popoverService);
  }

  list = [
    {
      id: '1',
      text: 'Utilizando Span <span class="brad-font-weight-bold brad-font-paragraph-sm brad-text-color-neutral-0"> Favoritos </span>como quiser. Quer ver como fazer?',
      target: 'firstStepTutorial',
    },
    {
      id: '2',
      text: 'Utilizando EM <em class="brad-font-weight-bold brad-font-paragraph-sm brad-text-color-neutral-0"> Favoritos </em>como quiser. Quer ver como fazer?',
      target: 'firstStepTutorial',
    },
    {
      id: '3',
      text: 'Utilizando EM e aria-label <em aria-label="Favoritos" class="brad-font-weight-bold brad-font-paragraph-sm brad-text-color-neutral-0"> Favoritos </em>como quiser. Quer ver como fazer?',
      target: 'firstStepTutorial',
    },
    {
      id: '4',
      text: 'Utilizando EM e aria-label <em aria-hidden="true" class="brad-font-weight-bold brad-font-paragraph-sm brad-text-color-neutral-0">Favoritos</em><span aria-hidden="true" class="brad-font-weight-bold brad-font-paragraph-sm brad-text-color-neutral-0" style="opacity: 0;">Favoritos</span>como quiser. Quer ver como fazer?',
      target: 'cardSalvar',
    },
  ];

  closeTutorial() {
    this.overlayService.close();
    this.popoverService.close();
  }
  openTutorial(idTarget: any, index: number) {
    this.popoverService = LiquidCorp.BradPopoverService.getInstance({
      id: 'popover-151',
      idTarget: 'target-345',
      list: this.list,
      currentItem: this.list[0],
      direction: 'bottom',
      idOverlay: 'myCanvas',
    });

    this.overlayService = LiquidCorp.BradOverlayService.getInstance({
      id: 'myCanvas',
      color: 'brad-bg-overlay-60',
    });
    this.popoverService.open();
    this.popoverService.resetStepper(idTarget);
    this.overlayService.open(idTarget);
  }
  prevTutorial() {
    this.popoverService.prevStepper();
    this.overlayService.updateTarget(
      this.popoverService.stepper.currentItem.target
    );
  }
  nextTutorial() {
    this.popoverService.nextStepper();
    this.overlayService.updateTarget(
      this.popoverService.stepper.currentItem.target
    );
  }

  onSelectionChange(selectedId: string) {
    console.log('itrem', selectedId);
    const firstValueItem = this.list[0];
    const receivedValueItem = this.list.findIndex((x) => x.id === selectedId);
    if (receivedValueItem) {
      this.list[0] = this.list[receivedValueItem];
      this.list[receivedValueItem] = firstValueItem;
    }
    console.log('teste', this.list);
  }
}
