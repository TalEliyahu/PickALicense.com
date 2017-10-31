"use strict";
var Question = (function () {
    function Question() {
    }
    Question.prototype.setData = function (jsonData) {
        this.jsonData = jsonData;
        this.yes_hint = jsonData.yes;
        this.no_hint = jsonData.no;
        if (jsonData.question) {
            this.question = jsonData.question;
            this.makeChilds();
        }
        else {
            this.license = jsonData.license;
        }
    };
    Question.prototype.makeChilds = function () {
        var _this = this;
        if (this.jsonData.question) {
            this.jsonData.children.forEach(function (child) {
                if (child.label.toLowerCase() == 'yes') {
                    _this.yes = new Question();
                    _this.yes.setData(child);
                }
                else {
                    _this.no = new Question();
                    _this.no.setData(child);
                }
            });
            this.hasChilds = true;
        }
        else {
            this.hasChilds = false;
        }
    };
    Question.prototype.getNext = function () {
        if (this.hasChilds) {
            return this.answer == 'yes' ? this.yes : this.no;
        }
    };
    return Question;
}());
exports.Question = Question;
//# sourceMappingURL=app.component.question.js.map