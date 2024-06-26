import { Component, OnInit, AfterViewInit } from '@angular/core';
declare let LiquidCorp: any;
@Component({
  selector: 'app-popover-stepper',
  templateUrl: './popover-stepper.component.html',
  styleUrls: ['./popover-stepper.component.css']
})
export class PopoverComponent implements AfterViewInit {
  overlayService: any;
  popoverService: any

  ngAfterViewInit() {
    this.popoverService = LiquidCorp.BradPopoverService.getInstance({
      id: "popover-151",
      idTarget: "target-345",
      list: this.list,
      currentItem: this.list[0],
      direction: "bottom",
    });

    this.overlayService = LiquidCorp.BradOverlayService.getInstance({
      id: "myCanvas",
      color: 'brad-bg-overlay-60'
    });
    console.log(this.popoverService)
  }

  list = [
    {
      id: "1",
      text: 'Aqui você confere todos os serviços e deixa a área de <span class="negrito" aria-hidden="true"> Favoritos </span> como quiser. Quer ver como fazer?',
    target: "target-345",
    },
{
  id: "2",
    text: 'Primeiro, toque em<div>Personalizar</div>',
      target: "target-2",
    },
{
  id: "3",
    text: '<h1>This is a <span aria-hidden="true">t<strong>e</strong>st</span><span style="position: absolute; clip: rect(1px 1px 1px 1px); clip: rect(1px, 1px, 1px, 1px); padding: 0; border: 0; height: 1px; width: 1px; overflow: hidden;">test</span>.</h1>',
      target: "target-3"
    },
{
  id: "4",
    text: "Aqui você confere todos os serviços e deixa a área de <b role='text' class='negrito'> Favoritos </b>como quiser. Quer ver como fazer?",
      target: "target-3",
    },
{
  id: "5",
    text: "Primeiro, toque em <div>personalizar</div>",
      target: "target-3",
    },
  ];

closeTutorial() {
  this.overlayService.close();
  this.popoverService.close();
}
openTutorial(idTarget: any) {
  this.popoverService.open();
  this.popoverService.resetStepper(idTarget);
  this.overlayService.open(idTarget);
}
prevTutorial() {
  this.popoverService.prevStepper();
  this.overlayService.updateTarget(this.popoverService.stepper.currentItem.target);
}
nextTutorial() {
  this.popoverService.nextStepper();
  this.overlayService.updateTarget(this.popoverService.stepper.currentItem.target);
}

}
