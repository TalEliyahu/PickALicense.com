/* Load main html and selector for this component is my-app */
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './html/main.html'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;

/* Include Angular Library for http request*/
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");

var app_component_question_1 = require("./app.component.question");

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/*get questions from api */
var AppComponent = (function () {
    
    function AppComponent(http) {
        var _this = this;
        this.http = http;
        this.answer = 'yes';
        this.state = 'beginning';
        http.get('./app/decision-tree.json').subscribe(function (res) {
            _this.jsonData = res.json();
            _this.question = new app_component_question_1.Question();
            _this.question.setData(res.json());
            _this.hint = _this.question.yes_hint;
        });
    }

    /* set answers for particular questions */
    AppComponent.prototype.setAnswer = function () {
        this.question.answer = this.answer;
        var nextQuestion = this.question.getNext();
        if (nextQuestion.question) {
            this.question = nextQuestion;
            this.hint = nextQuestion.yes_hint;
        }
        else {
            this.license = nextQuestion.license;
            this.setState('end');
        }
    };

    /* Set No for all answer*/
    AppComponent.prototype.setNo = function () {
        this.answer = 'no';
        this.setAnswer();
    };

    /* set current state */
    AppComponent.prototype.setState = function (state) {
        this.state = state;
    };

    /* switch button event click for on/off */
    AppComponent.prototype.switch = function () {
        this.answer = this.answer == 'yes' ? 'no' : 'yes';
        this.hint = this.answer == 'yes' ? this.question.yes_hint : this.question.no_hint;
    };

    /* get license for download file */
    AppComponent.prototype.getLicense = function () {
        var licenses = {
            'GNU GPL v3': '../licenses/gnu-gplv3.txt',
            'MIT': "../licenses/MIT.txt",
            'BSD 3-clause-license': "../licenses/BSD-3-clause.txt",
            'Apache License 2.0': "../licenses/apache-2-0.txt",
            'MPL 2.0': "../licenses/mpl-2.txt",
            'GNU LGPL v3.0': "../licenses/lgpl-3.txt"
        };
        return licenses[this.license];
    };
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map