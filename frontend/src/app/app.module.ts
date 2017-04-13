import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap/alert';
import { ToasterModule, ToasterService } from 'angular2-toaster';

import { AppComponent } from './app.component';
import { MovieListComponent } from './movieList/movie-list.component';
import { MovieDetailComponent } from './movieDetail/movie-detail.component';
import { MovieService } from './shared/movie.service';
import { ShowMovieDetailComponent } from './movieDetail/showMovieDetail/show-movie-detail.component';
import { EditMovieDetailComponent } from './movieDetail/editMovieDetail/edit-movie-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieDetailComponent,
    ShowMovieDetailComponent,
    EditMovieDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule,
    ToasterModule,
  ],
  providers: [
    MovieService,
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
