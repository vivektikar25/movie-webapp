import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieService } from './../shared/movie.service';
import { ToasterService } from 'angular2-toaster';
import { IMovie } from './../shared/movie.interface';

@Component({
selector: 'movie-detail',
templateUrl: './movie-detail.component.html',
styleUrls: ['./movie-detail.component.css']   
})
export class MovieDetailComponent implements OnInit{
    isEditable: boolean = false;
    movieId: number;
    movies = [];
    selectedMovieDetail;

    constructor(private movieService: MovieService, 
                private toasterService: ToasterService,
                private activatedRoute: ActivatedRoute,
                private route: ActivatedRoute) { }
    
    ngOnInit() {
       this.movies = this.route.snapshot.data['movieList'];
       this.activatedRoute.params.subscribe((params: Params) => this.movieId = +params['id']);
       this.getMovieDetail(this.movieId); 
    //    this.movieService.getMovieList()
    //                      .subscribe((data) => {
    //                         this.movies = data;
    //                         this.getMovieDetail(this.movieId);
    //                     });

       console.log("In nginit");
    }

    saveMovieDetail = (): void => {
        let movieId = this.selectedMovieDetail.id;
        let movieIndex = this.movieService.getMoviesIndex(movieId, this.movies)
        let updatedMovieObject = this.movies[movieIndex];
        let updatedMovie = this.movieService.removeEditFlags(updatedMovieObject);
        this.movieService.updateMovieDetail(movieId, updatedMovieObject)
                         .subscribe((successPayload) => {
                            this.toasterService.pop("success", "Success", "Movie detail updated successfully");   
                            this.resetMovieEditFlag(movieId, false);
                            },
                            (failurePayload)=> {
                                this.toasterService.pop("error", "Error", "Unable to save data make sure all edited values are valid");
                                this.resetMovieEditFlag(movieId, true);
                          });
    }

    resetMovieEditFlag = (movieId: number, status: boolean): void => {
        let movieIndex = this.movieService.getMoviesIndex(movieId, this.movies);
        this.movies[movieIndex]["isEditable"] = status;
    }

    editMovieDetail = (movieId: number) => {
        this.selectedMovieDetail.isEditable = true;
    }

    getMovieDetail(movieId): void {
        let movieIndex = this.movieService.getMoviesIndex(movieId, this.movies);
        if(movieIndex !== -1){
            this.selectedMovieDetail = this.movies[movieIndex];
        }
    }
}