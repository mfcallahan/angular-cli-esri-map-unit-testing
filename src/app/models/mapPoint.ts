export class MapPoint {
  location: string;
  lat: number;
  lon: number;

  constructor(location: string, lat: number, lon: number) {
    this.location = location;
    this.lat = lat;
    this.lon = lon;
  }
}
