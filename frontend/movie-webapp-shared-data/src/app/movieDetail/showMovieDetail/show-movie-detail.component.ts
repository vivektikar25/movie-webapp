import { Component, Input, Output } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { IMovie } from './../../shared/movie.interface';

@Component({
    selector: 'show-movie-detail',
    templateUrl: './show-movie-detail.component.html',
    styleUrls: ['./show-movie-detail.component.css']
})
export class ShowMovieDetailComponent {
    @Input() selectedMovieDetail: IMovie;
    constructor(private toasterService: ToasterService){ }

}
