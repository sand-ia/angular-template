import { Component } from '@angular/core';
import { FeatureAService } from '../../services/feature-a.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  constructor(public featureAService: FeatureAService) {}

  create() {
    this.featureAService.create().subscribe(() => console.log('created'));
  }
}
