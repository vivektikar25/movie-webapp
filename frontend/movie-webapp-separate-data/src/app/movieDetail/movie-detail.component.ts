import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MovieService } from './../shared/movie.service';
import { ToasterService } from 'angular2-toaster';
import { IMovie } from './../shared/movie.interface';

@Component({
selector: 'movie-detail',
templateUrl: './movie-detail.component.html',
styleUrls: ['./movie-detail.component.css']   
})
export class MovieDetailComponent{
    @Input() movieList: IMovie[];
    @Output() showMovieDetail = new EventEmitter();
    @Output() toggleView = new EventEmitter();
    @Output() updateMovieDetail = new EventEmitter();
    selectedMovieDetail: IMovie;
    isEditable: boolean = false;

    constructor(private movieService: MovieService, 
                private toasterService: ToasterService) { }
    
    editMovieDetail = () => this.isEditable = true;

    saveMovieDetail = (movieId): void => {
        let updatedMovieObj = this.movieService.getMovieById(movieId, this.movieList);
        this.updateMovieDetail.emit(updatedMovieObj);
        this.isEditable = false;
    }

    getMovieDetail(selectedMovieId): void{
        if(!this.isEditable){
            this.selectedMovieDetail = this.movieList.find(function(movie){
                return selectedMovieId == movie.id;
            })
        }else{
            this.toasterService.pop('warning', 'Warning', 'Save chanes please')
        }
    }

    getBackToListView = (): void => {
        if(this.isEditable){
            this.toasterService.pop('warning', 'Warning', 'Save chanes please')
        }else{
            this.toggleView.emit();
        }
    }
}