import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { RouteData, RouteDataForDisplay } from '@models/route.model';

@Injectable({
  providedIn: 'root',
})
export class NavRoutesService {
  private _routesForNav: RouteDataForDisplay[] = [];

  get routesForNav(): RouteDataForDisplay[] {
    return this._routesForNav;
  }

  /**
   *
   * @param routes The routes to be filtered
   * @returns The filtered routes that should be shown in the navigation
   */
  public generateRoutesForNav(routes: Routes) {
    routes.forEach((route) => {
      if (route.path && route.children) {
        route.children.forEach((childRoute) => {
          const routeData: RouteData = childRoute.data as RouteData;
          if (routeData.showInNav) {
            this._routesForNav.push({ ...routeData, path: childRoute.path });
          }
        });
      }
    });
  }
}
