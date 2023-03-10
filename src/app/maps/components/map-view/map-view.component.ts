import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor(
    private _placesService: PlacesService,
    private _mapService: MapService,
  ) { }

  ngAfterViewInit(): void {

    if (!this._placesService.userLocation) throw Error('No hay placesService.userLocation');
    
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/light-v10', 
      center: this._placesService.userLocation, 
      zoom: 14, 
      });

    const popup = new Popup()
      .setHTML(`
        <h6>Aquí estoy</h6>
        <span>Estoy en este lugar del mundo</span>
      `);

    new Marker({ color: 'red' })
      .setLngLat( this._placesService.userLocation )
      .setPopup( popup )
      .addTo( map )

    this._mapService.setMap( map );

    console.log(this._placesService.userLocation);
    

  }

}
