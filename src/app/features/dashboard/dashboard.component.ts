import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { GenderPickerComponent } from './gender-picker/gender-picker.component';
import { NavRoutesService } from '@services/nav-routes.service';
import { RouteDataForDisplay } from '@models/route.model';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    GenderPickerComponent,
    RouterModule,
    PageHeaderComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  navRoutesService = inject(NavRoutesService);
  routesForNav: RouteDataForDisplay[] = [];

  ngOnInit(): void {
    this.routesForNav = this.navRoutesService.routesForNav;
  }
}
