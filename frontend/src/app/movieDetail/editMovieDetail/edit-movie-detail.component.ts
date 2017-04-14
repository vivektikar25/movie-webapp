import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { IMovie } from './../../shared/movie.interface';

@Component({
    selector: 'edit-movie-detail',
    templateUrl: './edit-movie-detail.component.html',
    styleUrls: ['./edit-movie-detail.component.css']
})
export class EditMovieDetailComponent {
    @Input() selectedMovieDetail: IMovie;
    @Output() saveMovieDetail = new EventEmitter();
    constructor(private toasterService: ToasterService){ }

    saveMovieChanges = () => {
        this.saveMovieDetail.emit()
    }
}
