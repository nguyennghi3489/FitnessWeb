// Declare an interaface for type safety
import { Utilities } from '/app/utilities/utilities.ts';

export class Location {
  country: string;
  subLocality : string;
  administrative_area_level_1 : string;
  locality : string; 
  lat : number;
  lng : number;
  address : string;

  constructor(data){
    this.country = data.country || null;
    this.subLocality = data.subLocality || null;
    this.administrative_area_level_1 = data.administrative_area_level_1 || null;
    this.locality = data.locality || null;
    this.lat = data.lat || null;
    this.lng = data.lng || null;
    this.address = data.address || null;
  }
}
