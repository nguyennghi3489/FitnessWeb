// Declare an interaface for type safety
import { Utilities } from '/app/utilities/utilities.ts';

export class Activity {
  id: string;
  title : string;
  userId : string;
  type : number; 
  description : string;
  level : number;
  datetime : string;

  constructor(data){
    this.id = data.id || null;
    this.title = data.title || null;
    this.userId = data.userId || null;
    this.type = data.type || null;
    this.description = data.description || null;
    this.level = data.level || null;
    this.datetime = data.datetime || null;
  }
}