import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavRoutesService } from '@services/nav-routes.service';
import { RouteDataForDisplay } from '@models/route.model';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, PageHeaderComponent, MatRippleModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  navRoutesService = inject(NavRoutesService);
  routesForNav: RouteDataForDisplay[] = [];
  rippleColor = '#43a047';

  ngOnInit(): void {
    this.routesForNav = this.navRoutesService.routesForNav;
    this.removeDashboardRoute();
  }

  /**
   *
   */
  removeDashboardRoute(): void {
    this.routesForNav = this.routesForNav.filter(
      (route) => route.path !== 'dashboard',
    );
  }
}
