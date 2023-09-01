import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss']
})
export class GoBackComponent {
  
  private readonly canGoBack: boolean;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location
  ) {
    // This is where the check is done. Make sure to do this
    // here in the constructor, otherwise `getCurrentNavigation()`
    // will return null. 
    this.canGoBack = !!(this.router.getCurrentNavigation()?.previousNavigation);
  }

  goBack(): void {
    if (this.canGoBack) {
      // We can safely go back to the previous location as
      // we know it's within our app.
      this.location.back();
    } else {
      // There's no previous navigation.
      // Here we decide where to go. For example, let's say the
      // upper level is the index page, so we go up one level.
      this.router.navigate(['..'], {relativeTo: this.route});
    }
  }
}
