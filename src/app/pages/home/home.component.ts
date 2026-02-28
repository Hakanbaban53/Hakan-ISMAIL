import { Component, inject } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AnimatedLogoComponent } from '../../components/animated-logo/animated-logo';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatIconModule, AnimatedLogoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  navigationService = inject(NavigationService);
}
