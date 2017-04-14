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
  filterBy: string;
  filteredMovieList = []
  selectedMovieObject: ISelectedMovieObj = {"selectedMovieId": 0};
  currentActivatedView: string = "listView";

  constructor(private movieService: MovieService,
              private toasterService: ToasterService) { }

  ngOnInit(){
    this.movieService.getMovieList()
                     .subscribe((data) => {
                        this.movies = data
                        this.filteredMovieList = data});
  }

  showMovieDetail(payload){
    this.selectedMovieObject = {selectedMovieId: payload};
    this.currentActivatedView = 'detailView';  
  }

  getMovieDetail(payload){
    this.selectedMovieObject = {selectedMovieId: payload};
  }
  
  showMovieListView = () => {
    if(this.currentActivatedView == "detailView"){
      this.currentActivatedView = 'listView';
    }
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
    let movieIndex = this.movieService.getMoviesIndex(movieId, this.filteredMovieList);
    this.filteredMovieList[movieIndex][editableFlagName] = true;
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
    let movieIndex = this.movieService.getMoviesIndex(movieId, this.filteredMovieList);
    this.filteredMovieList[movieIndex]["isEditableInListView"] = false;
    this.filteredMovieList[movieIndex]["isEditableInDetailView"] = false;
  }

  filterMovieList = () => {
    let filterBy = this.filterBy;
    this.movieService.filterMovies(filterBy, this.movies);
    
    // if(filterBy !== ""){
    //   this.filteredMovieList = this.movieService.filterMovies(filterBy, this.movies);
    // }
    // else{
    //   this.filteredMovieList = this.movies;
    // }    
  }
}
