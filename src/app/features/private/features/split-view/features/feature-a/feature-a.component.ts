import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-feature-a',
  templateUrl: './feature-a.component.html',
  styleUrls: ['./feature-a.component.scss'],
})
export class FeatureAComponent implements OnInit {
  isInspectorVisible: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.setInspectorVisibility();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.setInspectorVisibility());
  }

  private setInspectorVisibility(): void {
    this.isInspectorVisible = !!this.route.firstChild;
  }
}
