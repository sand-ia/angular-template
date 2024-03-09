import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SplitViewService } from '../../split-view.service';

@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss'],
})
export class InspectorComponent implements OnInit {
  isInspectorVisible: boolean = false;
  isInspectorContentVisible: boolean = false;

  constructor(
    public splitViewService: SplitViewService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setInspectorVisibility();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.setInspectorVisibility());
    this.splitViewService.activeCanvas$.subscribe(() => {
      if (!!this.isInspectorVisible) this.close();
    });
  }

  close(): void {
    void this.router.navigate(['..'], { relativeTo: this.route.firstChild });
  }

  private setInspectorVisibility(): void {
    this.isInspectorVisible = !!this.route.firstChild;
    if (this.isInspectorVisible) {
      setTimeout(
        () => (this.isInspectorContentVisible = true),
        this.splitViewService.TRANSITION_TIME_MS
      );
    } else {
      this.isInspectorContentVisible = false;
    }
  }
}
