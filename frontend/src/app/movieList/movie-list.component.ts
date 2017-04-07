import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { IMovie } from './../shared/movie.interface';
import { MovieService } from './../shared/movie.service';

@Component({
    selector: 'movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
    @Input() movieList: IMovie[];
    @Output() showMovieDetail = new EventEmitter();
    @Output() updateMovieDetail = new EventEmitter();
    @Output() editMovie = new EventEmitter();

    constructor(private toasterService: ToasterService,
                private movieService: MovieService){ }

    editRow = (movieId:number): void => {
        let editMovieParams = {};
        editMovieParams["editFlagName"] = "isEditableInListView";
        editMovieParams["movieId"] = movieId;
        this.editMovie.emit(editMovieParams);
    };

    saveChanges = (movieId): void => {
        let movieIndex = this.movieService.getMoviesIndex(movieId, this.movieList) 
        let updatedMovieObject = this.movieList[movieIndex];
        this.updateMovieDetail.emit(updatedMovieObject);
    };

    gotoMovieDetail = (movieId): void => {
        this.showMovieDetail.emit(movieId);
    };
}
