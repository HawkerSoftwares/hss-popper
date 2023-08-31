import { Component, ElementRef, ViewChild } from '@angular/core';
import { HssPopperLibComponent, Placement, Placements } from 'projects/hss-popper-lib/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  example3modifiers = {
    flip: {
      behavior: ['right', 'bottom', 'top']
    }
  };
  example1select: Placement = Placements.Top;
  @ViewChild('popper3Content') popper3Content: any;

  constructor(private elem: ElementRef) {
  }

  ngOnInit() {
    setInterval(() => {
      this.popper3Content.update();
    }, 10);
  }

  changeExample1(popperRef: HssPopperLibComponent) {
    setTimeout(() => {
      this.elem.nativeElement.querySelector('#example10reference1').dispatchEvent(new Event('click'));
    }, 100)

  }

}