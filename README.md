# Angular-CLI-Heroku

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.1.

## Yarn

Run `npm install -g yarn` then `yarn install`.

If you want to use npm instead of yarn, change the yarn declaraction inside package.json for `npm : "3.10.9"` and delete `yarn.lock`.

## Development server

Run `ng serve` or `npm run dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Deploy on Heroku

First you need heroku toolbelt `https://devcenter.heroku.com/articles/heroku-cli#download-and-instal`.

Run `heroku create` to create a new application on Heroku.

Run `npm run deploy` Heroku will handle the bundle of the application to `dist/` folder and run it via express.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
