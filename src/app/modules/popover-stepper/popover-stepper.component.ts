import { Component, OnInit, AfterViewInit } from '@angular/core';
declare let LiquidCorp:any;
@Component({
  selector: 'app-popover-stepper',
  templateUrl: './popover-stepper.component.html',
  styleUrls: ['./popover-stepper.component.css']
})
export class PopoverComponent implements AfterViewInit{
  overlayService: any;
  popoverService:any

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
      color:'brad-bg-overlay-60'
    });
    console.log(this.popoverService)
  }

  list = [
    {
      id: "1",
      text: "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultrices venenatis diam a commodo. Maecenas nulla arcu, auctor aliquam mauris non, vehicula eleifend nisl.",
      target: "target-345",
    },
    {
      id: "2",
      text: "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultrices venenatis diam a commodo. Maecenas nulla arcu, auctor aliquam mauris non, vehicula eleifend nisl.",
      target: "target-2",
    },
    {
      id: "3",
      text: "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultrices venenatis diam a commodo. Maecenas nulla arcu, auctor aliquam mauris non, vehicula eleifend nisl.",
      target: "target-3",
    },
  ];

   closeTutorial() {
    this.overlayService.close();
    this.popoverService.close();
  }
   openTutorial(idTarget:any) {
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
