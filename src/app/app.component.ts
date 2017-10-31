import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Question } from './app.component.question'

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'my-app',
  templateUrl: './html/main.html',
})
export class AppComponent  {
  private jsonData: any
  private question: any
  private questionire: any;
  private answer: any = 'yes';
  public state = 'beginning';
  public hint: any;
  public license: any;
  public answeredQuestions = [];
  public sidebarActive = false;
  public showOwnersFAQ = true;
  public showUsersFAQ = false;
  public faq_owners = [];
  public faq_users = [];
  constructor(private http: Http){
    http.get('../app/questionire.json').subscribe((res: any) =>{
      this.questionire = res.json();
      http.get('../app/decision-tree.json').subscribe((res:any) => {
        this.jsonData = res.json();
        console.log(this.jsonData)
        this.question = new Question(this);
        this.question.setData(res.json());
        this.hint = this.question.yes_hint;
      })
    })
    http.get('../app/faq.json').subscribe((res: any) => {
      let data = res.json();
      this.faq_owners = data.owners;
      this.faq_users = data.users;
    })
  }
  setAnswer(){
    this.answeredQuestions.push(this.question);
    this.question = this.question.getNext()
    if (typeof this.question === "string")
      this.setState('end');
  }

  setState(state:any){
    console.log(state);
    this.state = state;
  }

  getLicense(){
    let licenses = {
      'GPL v3': '../licenses/gnu-gplv3.txt',
      'MIT': "../licenses/MIT.txt",
      'BSD 3-clause': "../licenses/bsd-3-clause.txt",
      'Apache 2.0': "../licenses/apache-2-0.txt",
      'MPL 2.0': "../licenses/mpl-2.txt",
      'LGPL v3': "../licenses/lgpl-3.txt",
      "LGPL v2.1": "../licenses/lgpl-2-1.txt",
      "Affero GPL": "../licenses/affero-gpl.txt",
      "Ms-RL": "../licenses/ms-rl.txt",
      "EPL 1.0": "../licenses/epl-1-0.txt",
      "CDDL 1.0": "../licenses/cddl-1-0.txt",
      "zlib/png license": "../licenses/zlib-png.txt",
      "BSD 2-clause": "../licenses/bsd-2-clause.txt",
      "WTFPL": "../licenses/wtfpl.txt",
      "Artistic license": "../licenses/artistic-license.txt",
      "CPOL 1.02": "../licenses/cpol-1-02.txt",
      "Ms-PL": "../licenses/ms-pl.txt"
    }
    let license = licenses[this.question]
    if (license)
      return licenses[this.question];
    console.log("No license file specified for " + this.question);
  }

  showSidebar(value){
    if (value){
      $('.sidebar').addClass('active');
    } else {
      $('.sidebar').removeClass('active');
    }

    this.sidebarActive = value;
    console.log(this.sidebarActive)
  }

  showUsers(){
    $('.users').addClass('active');
    $('.owners').removeClass('active');
    this.showOwnersFAQ = false;
    this.showUsersFAQ = true;
  }

  showOwners(){
    $('.owners').addClass('active');
    $('.users').removeClass('active');
    this.showOwnersFAQ = true;
    this.showUsersFAQ = false;
  }

  showAnswer(event){
    let id = event.srcElement.className;
    let elem = $("#"+id)
    console.log(elem);
    let div = $("#div_"+id)
    if (elem.css('display') == 'none'){
      div.addClass('active')
      elem.slideToggle();
      elem.css('display', 'block');
    }
    else{
      elem.slideToggle();
      div.removeClass('active');
    }
  }
 }
