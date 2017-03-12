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
    currentEditableMovieId: number = -1;
    @Input() movieList: IMovie[];
    @Output() showMovieDetail = new EventEmitter();
    @Output() updateMovieDetail = new EventEmitter();

    constructor(private toasterService: ToasterService,
                private movieService: MovieService){ }

    editRow = (newEditableMovieId:number): void => {
        if(this.currentEditableMovieId != -1){
            this.toasterService.pop('warning', 'Warning', 'Save changes please')
        }
        else{
            this.currentEditableMovieId=newEditableMovieId;
        }
    }

    saveChanges = (): void => {
        let updatedMovieObject: IMovie = this.movieService.getMovieById(this.currentEditableMovieId, this.movieList);
        this.updateMovieDetail.emit(updatedMovieObject);
        this.currentEditableMovieId = -1
    };

    gotoMovieDetail = (movieId): void => {
        this.showMovieDetail.emit(movieId);
    }
}
