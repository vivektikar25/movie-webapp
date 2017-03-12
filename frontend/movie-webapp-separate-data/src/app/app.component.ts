import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MovieService } from './shared/movie.service';
import { ToasterService } from 'angular2-toaster';
import { MovieDetailComponent } from './movieDetail/movie-detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MovieDetailComponent)
  private movieDetailComponent: MovieDetailComponent;

  movieList = []
  movieListForListView = []
  movieListForDetailView = []
  currentActivatedView: string = "listView";

  constructor(private movieService: MovieService,
              private toasterService: ToasterService) { }

  ngOnInit(){
    this.movieService.getMovieList()
                     .subscribe((data) => {
                       this.movieList = data;
                       this.updateMovieLists();
                    });
  }

  showMovieDetail(payload){
    this.movieDetailComponent.getMovieDetail(payload);
    this.toggleView(); 
  }

  toggleView = () => {
    this.currentActivatedView = this.currentActivatedView == 'listView'? 'detailView': 'listView'; 
  }

  updateMovieDetail = (updatedMovieObj) => {
    let updateMovieId = updatedMovieObj.id;
    this.movieService.updateMovieDetail(updateMovieId, updatedMovieObj)
                     .subscribe((successPayload)=>{
                        this.toasterService.pop("success", "Success", "Movie detail updated successfully");
                        this.movieService.updateLocalMovieList(updateMovieId, updatedMovieObj);
                        this.movieList = this.movieService.getLocalMovieList();
                        this.updateMovieLists();
                      },
                     (failurePayload)=>{
                       this.toasterService.pop("error", "Error", "Unable to save data make sure all edited values are valid");
                     });
  }

  updateMovieLists = () => {
    this.movieListForListView = JSON.parse(JSON.stringify(this.movieList)); //This is to create completely different list with different references for list and detail views.
    this.movieListForDetailView = JSON.parse(JSON.stringify(this.movieList));
  }
}
