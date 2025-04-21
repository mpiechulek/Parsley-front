import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { NavRoutesService } from '@services/nav-routes.service';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  navRoutesService = inject(NavRoutesService);

  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
  ) {
    // Here we are subscribing to the router events to set the title of the page
    // based on the data property of the route. The title is set to "Parsley | Route Title"
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.titleService.setTitle(
          `Parsley | ${
            this.activatedRoute.snapshot.firstChild?.data['title'] ||
            'Route Title'
          }`,
        );
      }
    });
    // Generate the routes for the side nav
    // This is done in the constructor of the NavRoutesService
    // IN THIS PLACE IT TIS BEING INITIALIZED AGAIN
    this.navRoutesService.generateRoutesForNav(routes);
  }
}
