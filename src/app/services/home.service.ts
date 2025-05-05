import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';            //Importerar mitt interface
import { Observable } from 'rxjs';                    //Importerar observables

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  //Properties
  url: string = "https://webbutveckling.miun.se/files/ramschema.json";

  constructor(private http: HttpClient) { }

  //Returnerar en observable (liknar promise) med en lista av objekt enligt mitt interface.
  getCourses(): Observable<Course[]> {
    //Skickar ett get-anrop till URL:en.
    return this.http.get<Course[]>(this.url);
  }
}
