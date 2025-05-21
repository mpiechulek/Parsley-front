import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteDataForDisplay } from '@models/route.model';
import { NavRoutesService } from '@services/nav-routes.service';

@Component({
  selector: 'app-side-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent implements OnInit {
  navRoutesService = inject(NavRoutesService);
  routesForNav: RouteDataForDisplay[] = [];

  ngOnInit(): void {
    this.routesForNav = this.navRoutesService.routesForNav.sort((a, b) => a.name.localeCompare(b.name));
  }
}
