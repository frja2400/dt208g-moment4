import { Component } from '@angular/core';
import { Course } from '../models/course';                  //Importerar mitt interface
import { HomeService } from '../services/home.service';     //Importerar min service
import { CommonModule } from '@angular/common';             //Importerar commonmodule för att kunna använda ngFor
import { FormsModule } from '@angular/forms';               //Importerar modul för formulärhantering

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //Properties.
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  filterValue: string = "";

  //Skapar en instans av HomeService med dependency injection. 
  //Skapar en privat variabel i klassen som heter homeService av typen HomeService. 
  constructor(private homeService: HomeService) {}

  //När komponent är inläst och redo (liknar window.inload) så hämtar vi data.
  ngOnInit() {
    //Anropa metoder i homeService för att hämta datan.
    this.homeService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filteredCourses = courses;   //Startar ofiltrerat
    })
  }

  applyFilter(): void {
    this.filteredCourses = this.courses.filter((course) =>
      //Filtrera på antingen kurskod eller kursnamn.
      course.code.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      course.coursename.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  //Metoder för sortering
  //Sorteringsriktning med boolean. True = stigande ordning. Används för att kunna växla mellan stigande och fallande.
  sortDirection = {
    code: true,
    coursename: true,
    progression: true
  }

  sortCode(): void {
    //Hämtar aktuell sortering (true)
    const direction = this.sortDirection.code;
    //Sortera filtrerade kurser utifrån code-kolumnen.
    this.filteredCourses.sort((a, b) =>
      //Använder localCompare för att jämföra strängar och ta hänsyn till språk.
      //En ternär operation väljer stigande eller fallande beroende på om cirection är true eller false.
      direction ? a.code.localeCompare(b.code) : b.code.localeCompare(a.code)
    );
    //Byter riktning för nästa gång man klickar.
    this.sortDirection.code = !direction;
  }

  sortName(): void {
    const direction = this.sortDirection.coursename;
    this.filteredCourses.sort((a ,b) => 
      direction ? a.coursename.localeCompare(b.coursename) : b.coursename.localeCompare(a.coursename)
    );
    this.sortDirection.coursename = !direction;
  }

  sortProgression(): void {
    const direction = this.sortDirection.progression;
    this.filteredCourses.sort((a ,b) => 
      direction ? a.progression.localeCompare(b.progression) : b.progression.localeCompare(a.progression)
    );
    this.sortDirection.progression = !direction;
  }
}
