import { Component } from '@angular/core';
import { Feature } from '../../interfaces/places';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  public selectedId: string = '';

  constructor(
    private _placesServices: PlacesService,
    private _mapService: MapService,
  ) { }

  get isLoadingPlaces(): boolean {
    return this._placesServices.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this._placesServices.places;
  }

  flyTo( place: Feature ) {
    this.selectedId = place.id;

    const [ lng, lat ] = place.center;
    this._mapService.flyTo([lng, lat]);
  }

  getDirections( place: Feature ) {
    if ( !this._placesServices.userLocation ) throw Error('No hay userLocation');

    this._placesServices.deletePlaces();

    const start = this._placesServices.userLocation;
    const end = place.center as [number, number];

    this._mapService.getRouteBetweenPoints(start, end);
  }
  

}
