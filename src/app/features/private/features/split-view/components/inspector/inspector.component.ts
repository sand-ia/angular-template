import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss'],
})
export class InspectorComponent implements OnInit {
  isInspectorVisible: boolean = false;
  isInspectorContentVisible: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.setInspectorVisibility();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.setInspectorVisibility());
  }

  async close(): Promise<void> {
    await this.router.navigate(['..'], { relativeTo: this.route.firstChild });
  }

  private setInspectorVisibility(): void {
    console.log(!!this.route.firstChild);
    this.isInspectorVisible = !!this.route.firstChild;

    if (this.isInspectorVisible) {
      setTimeout(() => (this.isInspectorContentVisible = true), 200);
    } else {
      this.isInspectorContentVisible = false;
    }
  }
}
