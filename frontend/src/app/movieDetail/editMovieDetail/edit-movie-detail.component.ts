import { Component, Input, Output } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { IMovie } from './../../shared/movie.interface';

@Component({
    selector: 'edit-movie-detail',
    templateUrl: './edit-movie-detail.component.html',
    styleUrls: ['edit-movie-detail.component.html']
})
export class EditMovieDetailComponent {
    @Input() selectedMovieDetail: IMovie;
    constructor(private toasterService: ToasterService){ }
}
