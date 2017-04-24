import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list.component';
import { MovieListRoutingModule } from './movie-list-routing.module';

@NgModule({
    imports: [
        MovieListRoutingModule
    ],
    declarations: [
        MovieListComponent
    ],
    providers: [

    ]
})
export class MovieListModule { }