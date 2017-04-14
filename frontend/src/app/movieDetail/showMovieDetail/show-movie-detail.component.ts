import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { IMovie } from './../../shared/movie.interface';

@Component({
    selector: 'show-movie-detail',
    templateUrl: './show-movie-detail.component.html',
    styleUrls: ['./show-movie-detail.component.css']
})
export class ShowMovieDetailComponent {
    @Input() selectedMovieDetail: IMovie;
    @Output() editMovieDetail = new EventEmitter();

    constructor(private toasterService: ToasterService){ }
    
    editMovie = (movieId) => {
        let editMovieParams = {};
        editMovieParams["editFlagName"] = "isEditableInDetailView";
        editMovieParams["movieId"] = movieId;
        this.editMovieDetail.emit(editMovieParams)
    }
}
