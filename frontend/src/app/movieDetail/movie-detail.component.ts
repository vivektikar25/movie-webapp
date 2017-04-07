import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MovieService } from './../shared/movie.service';
import { ToasterService } from 'angular2-toaster';
import { IMovie } from './../shared/movie.interface';

@Component({
selector: 'movie-detail',
templateUrl: './movie-detail.component.html',
styleUrls: ['./movie-detail.component.css']   
})
export class MovieDetailComponent implements OnChanges{
    @Input() movieList: IMovie[];
    @Input() selectedMovieObject;
    @Output() showMovieDetail = new EventEmitter();
    @Output() toggleView = new EventEmitter();
    @Output() updateMovieDetail = new EventEmitter();
    @Output() editMovie = new EventEmitter();
    selectedMovieDetail: IMovie;
    isEditable: boolean = false;
    constructor(private movieService: MovieService, 
                private toasterService: ToasterService) { }
    
    ngOnChanges(payload): void{
        this.selectedMovieObject = payload.selectedMovieObject? payload.selectedMovieObject.currentValue: 0;
        this.getMovieDetail(this.selectedMovieObject.selectedMovieId);
    } 
    
    saveMovieDetail = (): void => {
        this.updateMovieDetail.emit(this.selectedMovieDetail);
    }

    getMovieDetail(selectedMovieId): void{
        this.selectedMovieDetail = this.movieList.find(function(movie){
            return selectedMovieId == movie.id;
        });
        console.log(this.selectedMovieDetail);
    }

    getBackToListView = (): void => this.toggleView.emit();
        

    editMovieDetail = (editMovieParams) => {
        this.editMovie.emit(editMovieParams);
    }
}