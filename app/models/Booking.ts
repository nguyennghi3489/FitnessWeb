// Declare an interaface for type safety
import { Utilities } from '/app/utilities/utilities.ts';

export class Booking {
  id: string;
  fullname : string;
  activityTitle : string; 
  message : string;
  // description : string;
  // level : number;
  datetime : string;

  constructor(data){
    console.log(data);
    this.id = data._id || null;
    this.fullname = data.userId.fullname || null;
    this.activityTitle = data.activity.title || null;
    this.message = data.message || null;
    // this.type = data.type || null;
    // this.description = data.description || null;
    // this.level = data.level || null;
    this.datetime = data.activity.datetime || null;
  }
}