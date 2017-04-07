import { Component, OnInit } from '@angular/core';
import { MovieService } from './shared/movie.service';
import { ISelectedMovieObj } from './shared/movie.interface';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  movies = []
  selectedMovieObject: ISelectedMovieObj = {"selectedMovieId": 0};
  currentActivatedView: string = "listView";

  constructor(private movieService: MovieService,
              private toasterService: ToasterService) { }

  ngOnInit(){
    this.movieService.getMovieList()
                     .subscribe((data) => this.movies = data);
  }

  showMovieDetail(payload){
    this.selectedMovieObject = {selectedMovieId: payload};
    this.toggleView(); 
  }

  toggleView = () => {
    this.currentActivatedView = this.currentActivatedView == 'listView'? 'detailView': 'listView'; 
  }

  updateMovieDetail = (updatedMovieObject) => {
    let updatedMovieId = updatedMovieObject.id;
    let moviesEditFlags = {};
    moviesEditFlags["isEditableInListView"] = updatedMovieObject["isEditableInListView"];
    moviesEditFlags["isEditableInDetailView"] = updatedMovieObject["isEditableInDetailView"];
    let updatedMovie = this.movieService.removeEditFlags(updatedMovieObject);
    this.movieService.updateMovieDetail(updatedMovieId, updatedMovie)
                     .subscribe((successPayload) => {
                        this.setEditFlags(updatedMovieId);
                        this.toasterService.pop("success", "Success", "Movie detail updated successfully");   
                      },
                      (failurePayload)=> {
                        this.resetMoviesEditState(updatedMovieId, moviesEditFlags);
                        this.toasterService.pop("error", "Error", "Unable to save data make sure all edited values are valid");
                      });
  }

  editMovie = (editMovieParams) => {
    let movieId = editMovieParams.movieId;
    let editableFlagName = editMovieParams.editFlagName;
    let movieIndex = this.movieService.getMoviesIndex(movieId, this.movies);
    this.movies[movieIndex][editableFlagName] = true;
  }

  resetMoviesEditState = (updatedMovieId, moviesEditFlags) => {
    let editMovieParams = {};
    editMovieParams["movieId"] = updatedMovieId;
    for (let key in moviesEditFlags){
        let editFlagName = key;
        let editFlagValue = moviesEditFlags[key];
        if(editFlagValue) {
            editMovieParams["editFlagName"] = editFlagName;
            this.editMovie(editMovieParams);
        }
    }
  }

  setEditFlags = (movieId) => {
    let movieIndex = this.movieService.getMoviesIndex(movieId, this.movies);
    this.movies[movieIndex]["isEditableInListView"] = false;
    this.movies[movieIndex]["isEditableInDetailView"] = false;
  }
}
