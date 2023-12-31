import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, OnDestroy, Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Placements, PopperContentOptions, Triggers } from '.';
import Popper from 'popper.js'

@Component({
  selector: 'popper-content',
  templateUrl: './hss-popper-lib.component.html',
  styleUrls: ['./hss-popper-lib.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HssPopperLibComponent implements OnDestroy {

  popperOptions: PopperContentOptions = <PopperContentOptions>{
    disableAnimation: false,
    disableDefaultStyling: false,
    placement: Placements.Auto,
    boundariesElement: '',
    trigger: Triggers.HOVER,
    positionFixed: false,
    appendToBody: false,
    popperModifiers: {}
  };

  referenceObject!: HTMLElement;

  isMouseOver: boolean = false;

  onHidden = new EventEmitter();

  text: string = '';

  popperInstance!: Popper;

  displayType: string = "none";

  opacity: number = 0;

  ariaHidden: string = 'true';

  arrowColor: string | null = null;

  onUpdate!: Function;

  state: boolean = true;

  private globalResize: any;

  @ViewChild("popperViewRef")
  popperViewRef!: ElementRef;

  @HostListener('mouseover')
  onMouseOver() {
    this.isMouseOver = true;
  }

  @HostListener('mouseleave')
  showOnLeave() {
    this.isMouseOver = false;
    if (this.popperOptions.trigger !== Triggers.HOVER && !this.popperOptions.hideOnMouseLeave) {
      return;
    }
    this.hide();
  }

  onDocumentResize() {
    this.update();
  }
  isDestroyed = false;
  constructor(
    public elemRef: ElementRef,
    private renderer: Renderer2,
    private viewRef: ViewContainerRef,
    private cd: ChangeDetectorRef) {
  }

  ngOnDestroy() {
    this.isDestroyed = true;
    this.clean();
    if(this.popperOptions.appendTo && this.elemRef && this.elemRef.nativeElement && this.elemRef.nativeElement.parentNode){
      this.viewRef.detach();
      this.elemRef.nativeElement.parentNode.removeChild(this.elemRef.nativeElement);
    }
  }

  clean() {
    this.toggleVisibility(false);
    if (!this.popperInstance) {
      return;
    }
    (this.popperInstance as any).disableEventListeners();
    this.popperInstance.destroy();

  }

  show(): void {
    if (!this.referenceObject) {
      return;
    }

    const appendToParent = this.popperOptions.appendTo && document.querySelector(this.popperOptions.appendTo);
    if (appendToParent && this.elemRef.nativeElement.parentNode !== appendToParent) {
      this.elemRef.nativeElement.parentNode && this.elemRef.nativeElement.parentNode.removeChild(this.elemRef.nativeElement);
      appendToParent.appendChild(this.elemRef.nativeElement);
    }

    let popperOptions: Popper.PopperOptions = <Popper.PopperOptions>{
      placement: this.popperOptions.placement,
      positionFixed: this.popperOptions.positionFixed,
      modifiers: {
        arrow: {
          element: this.popperViewRef.nativeElement.querySelector('.ngxp__arrow')
        }
      }
    };
    if (this.onUpdate) {
      popperOptions.onUpdate = this.onUpdate as any;
    }

    let boundariesElement = this.popperOptions.boundariesElement && document.querySelector(this.popperOptions.boundariesElement);

    if (popperOptions.modifiers && boundariesElement) {
      popperOptions.modifiers.preventOverflow = {boundariesElement};
    }
    if (popperOptions.modifiers && this.popperOptions.preventOverflow !== undefined) {
      popperOptions.modifiers.preventOverflow = popperOptions.modifiers.preventOverflow || {};
      popperOptions.modifiers.preventOverflow.enabled = this.popperOptions.preventOverflow;
      if (!popperOptions.modifiers.preventOverflow.enabled) {
        popperOptions.modifiers.hide = {enabled: false};
      }
    }
    this.determineArrowColor();
    popperOptions.modifiers = Object.assign(popperOptions.modifiers || {}, this.popperOptions.popperModifiers);

    this.popperInstance = new Popper(
      this.referenceObject,
      this.popperViewRef.nativeElement,
      popperOptions,
    );

    (this.popperInstance as any).enableEventListeners();
    this.scheduleUpdate();
    this.toggleVisibility(true);
    this.globalResize = this.renderer.listen('document', 'resize', this.onDocumentResize.bind(this))
  }

  private determineArrowColor() {
    ['background-color', 'backgroundColor'].some((clr) => {
      if (!this.popperOptions.styles) {
        return false;
      }
      if (this.popperOptions.styles.hasOwnProperty(clr)) {
        const styles: any = this.popperOptions.styles;
        this.arrowColor = styles[clr];
        return true;
      }
      return false;
    })
  }

  update(): void {
    this.popperInstance && (this.popperInstance as any).update();
  }

  scheduleUpdate(): void {
    this.popperInstance && (this.popperInstance as any).scheduleUpdate();
  }

  hide(): void {
    if (this.popperInstance) {
      this.popperInstance.destroy();
    }
    this.toggleVisibility(false);
    this.onHidden.emit();
  }

  toggleVisibility(state: boolean) {
    if (!state) {
      this.opacity = 0;
      this.displayType = "none";
      this.ariaHidden = 'true';
      this.state = false;
    }
    else {
      this.opacity = 1;
      this.displayType = "block";
      this.ariaHidden = 'false';
      this.state = true;
    }
    if(!this.isDestroyed) {
      this.cd?.detectChanges();
    }
  }

  extractAppliedClassListExpr(classList?: string): Object | null {
    if (!classList || typeof classList !== 'string') {
      return null;
    }
    try {
      return classList
        .replace(/ /, '')
        .split(',')
        .reduce((acc: any, clss) => {
          acc[clss] = true;
          return acc;
        }, {})
    }
    catch (e) {
      return null;
    }
  }

  private clearGlobalResize() {
    this.globalResize && typeof this.globalResize === 'function' && this.globalResize();
  }

}
