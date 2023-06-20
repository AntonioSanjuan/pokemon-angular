import {
    Directive,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    ElementRef,
  } from '@angular/core'
  import { Observable, Subscription } from 'rxjs'
  
  @Directive({
    selector: '[appIntersectionObserver]',
  })
  export class IntersectionObserverDirective implements OnInit, OnDestroy {
    @Input() offset: number = 0;

    @Input() active = false
    @Output() isIntersecting = new EventEmitter<boolean>()
  
    public _isIntersecting: boolean = false
    public subscription!: Subscription
  
    constructor (private element: ElementRef<Element>) {
    }
  
    ngOnInit () {
      this.subscription = this.createAndObserve()
    }
  
    ngOnDestroy () {
      this.subscription.unsubscribe()
    }
  
    createAndObserve () {

      const options: IntersectionObserverInit = {
        root: null,
        rootMargin: `-${100 + this.offset}% 0px ${this.offset}% 0px`,
        threshold: 0,
      }
  
      return new Observable<boolean>(subscriber => {

        const intersectionObserver = new IntersectionObserver(entries => {

          const { isIntersecting } = entries[0]
          subscriber.next(isIntersecting)
  
          isIntersecting &&
            !this.active &&
            intersectionObserver.disconnect()
        }, options)
  
        intersectionObserver.observe(this.element.nativeElement)
  
        return {
          unsubscribe () {
            intersectionObserver.disconnect()
          },
        }
      })
        .subscribe(insideElementOffset => {
          this.isIntersecting.emit(!insideElementOffset)
          this._isIntersecting = !insideElementOffset
        })
    }
  }
  