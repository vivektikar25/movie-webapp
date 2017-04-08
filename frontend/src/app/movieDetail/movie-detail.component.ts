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
    @Output() getNewMovieDetail = new EventEmitter();
    @Output() showMovieListView = new EventEmitter();
    @Output() updateMovieDetail = new EventEmitter();
    @Output() editMovie = new EventEmitter();

    selectedMovieDetail: IMovie;
    isEditable: boolean = false;
    constructor(private movieService: MovieService, 
                private toasterService: ToasterService) { }
    
    ngOnChanges(payload): void{
        if(payload.movieList){
            this.movieList = payload.movieList.currentValue;
        }
        if(payload.selectedMovieObject){
            this.selectedMovieObject = payload.selectedMovieObject.currentValue;
        }

        this.getMovieDetail(this.selectedMovieObject.selectedMovieId);
    } 
    
    saveMovieDetail = (): void => {
        this.updateMovieDetail.emit(this.selectedMovieDetail);
    }

    getMovieDetail(selectedMovieId): void{
        let movieIndex = this.movieService.getMoviesIndex(selectedMovieId, this.movieList);
        if(movieIndex !== -1){
            this.selectedMovieDetail = this.movieList[movieIndex];
        }
        else{
            let firsMovieId = this.movieList[0]? this.movieList[0].id:0;
            this.getNewMovieDetail.emit(firsMovieId);
        }
    }

    getBackToListView = (): void => this.showMovieListView.emit();
    
    editMovieDetail = (editMovieParams) => {
        this.editMovie.emit(editMovieParams);
    }
}