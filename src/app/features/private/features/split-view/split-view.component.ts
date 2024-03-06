import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SplitViewService } from './split-view.service';

@Component({
  selector: 'app-split-view',
  templateUrl: './split-view.component.html',
  styleUrls: ['./split-view.component.scss'],
})
export class SplitViewComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private splitViewService: SplitViewService
  ) {}

  navigateTo(route: string): void {
    this.splitViewService.setActiveCanvas(route);
    setTimeout(
      () => void this.router.navigate([route], { relativeTo: this.route }),
      200
    );
  }
}
