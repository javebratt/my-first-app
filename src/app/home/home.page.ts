import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  movies;
  constructor(private firestore: AngularFirestore) {
    this.firestore
      .collection('movies')
      .valueChanges({ idField: 'movieId' })
      .subscribe((movies) => {
        this.movies = movies;
        console.log(movies);
      });
  }
}
