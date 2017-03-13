import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { IMovie } from './../shared/movie.interface';
import { MovieService } from './../shared/movie.service';

@Component({
    selector: 'movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnChanges {
    currentEditableMovieId: number = -1;
    @Input() movieList: IMovie[];
    @Output() showMovieDetail = new EventEmitter();
    @Output() updateMovieDetail = new EventEmitter();
    filteredMovieList: IMovie[];
    filterBy: string = "";

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

    ngOnChanges(payload){
        this.filteredMovieList = this.movieList;
        console.log("In onchange", this.movieList);
        if(this.filterBy !== ""){
            this.filterMoviesByTitle();
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

    filterMoviesByTitle = () => {
        console.log("In filterMoviesByTitle");
        if(this.filterBy === ""){
            this.filteredMovieList = this.movieList;
        }else{
            let filteredList = this.movieService.getFilteredList(this.movieList, this.filterBy)
            this.filteredMovieList = filteredList;
        }
    }
}
