import { Component } from '@angular/core';

declare let LiquidCorp: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'miniapp';
  overlayService: any;
  popoverService:any
  ngOnInit() {
    const options = {
      targetSelector: '#myCarousel',
      config: {
        centeredSlides: false,
        slidesPerView: 2,
        initialSlide: 1,
        loop: false,
        autoplay: false,
      },
    };
    const service = LiquidCorp.BradCarouselService.getInstance(options);

    this.popoverService = LiquidCorp.BradPopoverService.getInstance({
      id: "popover-151",
      idTarget: "target-345",
      list: this.list,
      currentItem: this.list[0],
      direction: "bottom",
      idOverlay: "myCanvas",
    });

    this.overlayService = LiquidCorp.BradOverlayService.getInstance({
      id: "myCanvas",
      color:'brad-bg-overlay-60'
    });

    // var doubleTouchStartTimestamp = 0;
    // document.addEventListener('touchstart', function (event) {
    //   var now = +new Date();
    //   if (doubleTouchStartTimestamp + 500 > now) {
    //     console.log('prevented');
    //     event.preventDefault();
    //   }
    //   doubleTouchStartTimestamp = now;
    // });
  }

  private isTouchEvent(event: any): event is TouchEvent {
    return 'TouchEvent' in window && event instanceof TouchEvent;
  }
  list = [
    {
      id: "1",
      text: "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultrices venenatis diam a commodo. Maecenas nulla arcu, auctor aliquam mauris non, vehicula eleifend nisl.",
      target: "target-345",
      direction: "top", // opcional, caso não especificar, será definido pelo getInstance
    },
    {
      id: "2",
      text: "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultrices venenatis diam a commodo. Maecenas nulla arcu, auctor aliquam mauris non, vehicula eleifend nisl.",
      target: "target-2",
      direction: "top",
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
