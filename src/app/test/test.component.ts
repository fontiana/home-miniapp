import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  @ViewChild('inputFlex') cb!: ElementRef;

  qtde:any = [].constructor(8);
  additem(){
    this.qtde = [].constructor(Number(this.cb.nativeElement.value));
  }
}
