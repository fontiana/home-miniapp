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

  ngOnInit() {
    const options = {
      targetSelector: '#myCarousel',
      config: {
        centeredSlides: false,
        slidesPerView: 2,
        initialSlide: 1,
        loop: false,
        autoplay: { delay: 1000 },
      },
    };
    const service = LiquidCorp.BradCarouselService.getInstance(options);

    this.overlayService = LiquidCorp.BradOverlayService.getInstance({
      id: 'myCanvas',
      color: 'brad-bg-overlay-40',
    });

    document.addEventListener(
      'touchmove',
      (event) => {
        if (this.isTouchEvent(event)) {
          const touchEvent = event as TouchEvent;
          if (touchEvent.touches.length > 1) {
            event.preventDefault();
          }
        }
      },
      { passive: false }
    );
  }

  private isTouchEvent(event: any): event is TouchEvent {
    return 'TouchEvent' in window && event instanceof TouchEvent;
  }

  open(target: string) {
    this.overlayService.open(target);
  }

  updateTarget(target: string) {
    this.overlayService.updateTarget(target);
  }

  close() {
    this.overlayService.close();
  }
}
