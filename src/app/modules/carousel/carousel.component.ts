import { Component, OnInit } from '@angular/core';
declare let LiquidCorp:any;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const options = {
      targetSelector: "#myCarousel",
      config: {
        centeredSlides: false,
        slidesPerView: 2,
        initialSlide: 1,
        loop: false,
        autoplay: false,
      },
    };
    const service = LiquidCorp.BradCarouselService.getInstance(options);
  }

}
