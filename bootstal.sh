#!/bin/bash

sudo apt-get install xdotool

xdotool key ctrl+shift+t
xdotool type 'cd ./frontend/movie-webapp-separate-data';
xdotool key Return;
xdotool type 'npm install';
xdotool key Return;
xdotool type 'npm start';
xdotool key Return;


xdotool key ctrl+shift+t
xdotool type 'cd ./../movie-webapp-shared-data';
xdotool key Return;
xdotool type 'npm install';
xdotool key Return;
xdotool type 'npm start';
xdotool key Return;

xdotool key ctrl+shift+t
xdotool type 'cd ./../../backend';
xdotool key Return;
xdotool type 'pip install virtualenv';
xdotool key Return;
xdotool type 'virtualenv movie-webapp_virt';
xdotool key Return;
xdotool type 'source ./movie-webapp_virt/bin/activate';
xdotool key Return;
xdotool type 'pip install -r requirement.txt';
xdotool key Return;
xdotool type 'cd movie_app';
xdotool key Return;
xdotool type 'python manage.py runserver';
xdotool key Return;
