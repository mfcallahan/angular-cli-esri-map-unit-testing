import { IMapPoint } from 'src/app/interfaces/iMapPoint';

export class MapPoint implements IMapPoint {
  location: string;
  lat: number;
  lon: number;

  constructor(location: string, lat: number, lon: number) {
    this.location = location;
    this.lat = lat;
    this.lon = lon;
  }
}
