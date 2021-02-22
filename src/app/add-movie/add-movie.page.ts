import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';

import { Plugins, CameraResultType } from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
})
export class AddMoviePage implements OnInit {
  movie = {
    title: '',
    rating: 0,
    img: null,
  };
  movieId: string = 'new';
  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
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

  async takePicture(): Promise<void> {
    try {
      const moviePicture = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });

      const moviePictureRef = this.storage.ref(
        `movies/${this.movieId}/moviePicture.png`
      );

      moviePictureRef
        .putString(moviePicture.base64String, 'base64', {
          contentType: 'image/png',
        })
        .then(() => {
          moviePictureRef.getDownloadURL().subscribe((downloadURL) => {
            this.movie.img = downloadURL;
            console.log(this.movie);
          });
        });

      console.log(moviePicture);
    } catch (error) {
      console.warn(error);
    }
  }
}
