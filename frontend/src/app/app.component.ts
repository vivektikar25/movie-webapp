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

  updateMovieDetail = (updateMovieId) => {
    let updatedMovieObject = this.movieService.getMovieById(updateMovieId, this.movies);
    this.movieService.updateMovieDetail(updateMovieId, updatedMovieObject)
                     .subscribe((successPayload) => {
                        this.toasterService.pop("success", "Success", "Movie detail updated successfully");   
                      },
                      (failurePayload)=> {
                        this.toasterService.pop("error", "Error", "Unable to save data make sure all edited values are valid");
                      });
  }
}
