import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { RouteData, RouteDataForDisplay } from '@models/route.model';
import { routes } from 'app/app.routes';

@Component({
  selector: 'app-side-nav',
  imports: [CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent implements OnInit {
  routesForNav: RouteDataForDisplay[] = [];

  ngOnInit(): void {
    this.getRoutesForNav(routes);
  }

  private getRoutesForNav(routes: Routes) {
    routes.forEach((route) => {
      if (route.path && route.children) {
        route.children.forEach((childRoute) => {
          const routeData: RouteData = childRoute.data as RouteData;
          if (routeData.showInNav) {
            this.routesForNav.push(routeData);
          }
        });
      }
    });
  }
}
