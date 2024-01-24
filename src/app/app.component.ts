import { Component } from '@angular/core';

declare let LiquidCorp: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'miniapp';

  ngOnInit() {
    const options = {
      targetSelector: "#myCarousel",
      config: {
        centeredSlides: false,
        slidesPerView: 2,
        initialSlide: 1,
        loop: false,
        autoplay: { delay: 1000 },
      },
    };
    const service = LiquidCorp.BradCarouselService.getInstance(options);
  }
}
