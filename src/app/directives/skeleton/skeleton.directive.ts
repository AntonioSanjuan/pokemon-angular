import { Directive, ElementRef,Input, AfterViewInit  } from '@angular/core';

@Directive({
  selector: '[appSkeleton]'
})
export class SkeletonDirective implements AfterViewInit  {
  private defaultWidth = "100px"
  private defaultHeight = "20px"

  @Input() active!: boolean;
  @Input() width: string = this.defaultWidth;
  @Input() height: string = this.defaultHeight;

  constructor(private el: ElementRef<HTMLElement>) { }
  
  ngAfterViewInit(): void {
    console.log("active", this.active)
    if(this.active) {
      this.el.nativeElement.style.minWidth = this.width;
      this.el.nativeElement.style.color = 'transparent';
      this.el.nativeElement.style.background = 'linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)';
      this.el.nativeElement.style.fontSize = this.height;
      this.el.nativeElement.style.userSelect= 'none'; /* Standard syntax */
      this.el.nativeElement.style.borderRadius = '10px'
      this.el.nativeElement.style.animation = '1.5s shine linear infinite';

    } else {

    }
    
   }	
}
