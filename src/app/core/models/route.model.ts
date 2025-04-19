export interface RouteData {
  title: string;
  name: string;
  showInNav: boolean;
}

export interface RouteDataForDisplay extends Omit<RouteData, 'showInNav'> {
  path?: string;
}
