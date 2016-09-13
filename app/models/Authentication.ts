// Declare an interaface for type safety
import { Utilities } from '/app/utilities/utilities.ts';

export class Authentication {
  fullName: string;
  isActive: number;
  token: string;
  userId: string;
  bookings: any;
  constructor(data){
    this.fullName = data.fullName;
    this.isActive = data.isActive;
    this.token = data.token;
    this.userId = data.userId;
    this.bookings = data.bookings;
  }
}

export class AuthenticationData {
  firstname: string;
  lastname: number;
  email: string;
  password: string;
  baseImageUrl: string;
  nationality: string;
  major: [string];
  quotes: string;
  description: string;
  constructor(data){
    console.log(data);
    console.log("CONSTRUCTOR HERE");
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.password = data.password;
  }
  extend(data){
    this.baseImageUrl = data.baseImageUrl || null;
    this.nationality = data.nationality;
    this.major = data.major;
    this.quotes = data.quotes;
    this.description = data.description;
    this.gender = data.gender || null;
  }
}