import { Component } from '@angular/core';
import { Course } from '../models/course';                  //Importerar mitt interface
import { HomeService } from '../services/home.service';     //Importerar min service
import { CommonModule } from '@angular/common';             //Importerar commonmodule för att kunna använda ngFor

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //Properties. Denna tomma array fylla på när vi hämtar data från JSON-filen.
  courses: Course[] = [];

  //Skapar en instans av HomeService med dependency injection. 
  //Skapar en privat variabel i klassen som heter homeService av typen HomeService. 
  constructor(private homeService: HomeService) {}

  //När komponent är inläst och redo (liknar window.inload) så hämtar vi data.
  ngOnInit() {
    //Anropa metoder i homeService för att hämta datan.
    this.homeService.getCourses().subscribe((courses) => {
      this.courses = courses;
    })
  }
}
