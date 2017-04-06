import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { IMovie } from './../shared/movie.interface';

@Component({
    selector: 'movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
    currentEditableMovieId: number = -1;
    @Input() movieList: IMovie[];
    @Output() showMovieDetail = new EventEmitter();
    @Output() updateMovieDetail = new EventEmitter();
    @Output() editMovie = new EventEmitter();

    constructor(private toasterService: ToasterService){ }

    editRow = (newEditableMovieId:number): void => {
        var editMovieParams = {};
        editMovieParams["editableView"] = "listView";
        editMovieParams["movieId"] = newEditableMovieId;
        this.editMovie.emit(editMovieParams);
    }

    saveChanges = (): void => {
        this.updateMovieDetail.emit(this.currentEditableMovieId);
        this.currentEditableMovieId = -1
    };

    gotoMovieDetail = (movieId): void => {
        this.showMovieDetail.emit(movieId);
    }
}
