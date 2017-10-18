import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Question } from './app.component.question'

@Component({
  selector: 'my-app',
  templateUrl: './html/main.html'
})
export class AppComponent  {
  private jsonData: any
  private question: any
  private answer: any = 'yes';
  public state = 'beginning';
  public hint: any;
  public license: any;
  constructor(private http: Http){
    http.get('./app/decision-tree.json').subscribe((res:any) => {
      this.jsonData = res.json();
      this.question = new Question();
      this.question.setData(res.json());
      this.hint = this.question.yes_hint;
    })
  }
  setAnswer(){
    this.question.answer = this.answer;
    let nextQuestion = this.question.getNext()
    if (nextQuestion.question){
      this.question = nextQuestion;
      this.hint = nextQuestion.yes_hint
    } else {
      this.license = nextQuestion.license
      this.setState('end');
    }
  }

  setNo(){
    this.answer = 'no';
    this.setAnswer();
  }

  setState(state:any){
    console.log(state);
    this.state = state;
  }

  switch(){
    this.answer = this.answer == 'yes'?'no':'yes';
    this.hint = this.answer == 'yes'? this.question.yes_hint: this.question.no_hint
  }

  getLicense(){
    let licenses = {
      'GNU GPL v3': '../licenses/gnu-gplv3.txt',
      'MIT': "../licenses/MIT.txt",
      'BSD 3-clause-license': "../licenses/BSD-3-clause.txt",
      'Apache License 2.0': "../licenses/apache-2-0.txt",
      'MPL 2.0': "../licenses/mpl-2.txt",
      'GNU LGPL v3.0': "../licenses/lgpl-3.txt"
    }
    return licenses[this.license];
  }
 }
