import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  movies;
  constructor(
    private firestore: AngularFirestore,
    private titleService: Title,
    private metaTags: Meta
  ) {
    this.firestore
      .collection('movies')
      .valueChanges({ idField: 'movieId' })
      .subscribe((movies) => {
        this.movies = movies;
        console.log(movies);
      });
    this.titleService.setTitle(`Movie List`);
    this.metaTags.updateTag({
      name: 'description',
      content: 'This is the description of my website',
    });
  }
}
