import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
})
export class AddMoviePage implements OnInit {
  movie = {
    title: '',
    rating: 0,
  };
  movieId: string = 'new';
  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.movieId = this.route.snapshot.params.movieId || 'new';

    if (this.movieId !== 'new') {
      this.firestore
        .doc(`movies/${this.movieId}`)
        .valueChanges()
        .subscribe((movie: any) => (this.movie = movie));
    }
  }

  saveMovie(): void {
    if (this.movieId === 'new') {
      this.firestore
        .collection(`movies`)
        .add(this.movie)
        .then(() => {
          this.movie = null;
          this.router.navigateByUrl('');
        });
    } else {
      this.firestore
        .doc(`movies/${this.movieId}`)
        .update(this.movie)
        .then(() => {
          this.movie = null;
          this.router.navigateByUrl('');
        });
    }
  }

  deleteMovie(): void {
    if (this.movieId !== 'new') {
      this.firestore
        .doc(`movies/${this.movieId}`)
        .delete()
        .then(() => {
          this.movie = null;
          this.router.navigateByUrl('');
        });
    }
  }
}
