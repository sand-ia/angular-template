import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() link?: string;
  @Input() delay: number = 0;
  isButtonActive: boolean = false;
  splittedLink: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (!this.link) return;
    this.splittedLink = this.link.split('/');
    this.setButtonState();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.setButtonState());
  }

  onClick(): void {
    if (!this.link) return;
    setTimeout(
      () => void this.router.navigate([this.link], { relativeTo: this.route }),
      this.delay
    );
  }

  private setButtonState(): void {
    let currentRoute: ActivatedRoute | null | undefined = this.route;
    this.isButtonActive = this.splittedLink.every(link => {
      currentRoute = currentRoute?.firstChild;
      const path = currentRoute?.snapshot.url[0]?.path;
      return path == link;
    });
  }
}
