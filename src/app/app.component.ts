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
  public showUsersFAQ = true;
  public faq_owners = [];
  public faq_users = [];
  
  /* Constructor load the questions http request and question response */
  constructor(private http: Http){
    http.get('../app/questionire.json').subscribe((res: any) =>{
      this.questionire = res.json();
      http.get('../app/decision-tree.json').subscribe((res:any) => {
        this.jsonData = res.json();
        this.question = new Question(this);
        this.question.setData(res.json());
        this.hint = this.question.yes_hint;
      })
    })
    http.get('../app/faq_users.json').subscribe((res: any) => {
      let data = res.json();
      this.faq_users = data.faq;
    })
    http.get('../app/faq_owners.json').subscribe((res: any) => {
      let data = res.json();
      this.faq_owners = data.faq;
    })
  }

  /* Set Answers for the question till the end */
  setAnswer(){
    this.answeredQuestions.push(this.question);
    this.question = this.question.getNext()
    if (typeof this.question === "string")
      this.setState('end');
  }

  /* get the state like which route you have */
  setState(state:any){
    this.state = state;
  }

  /* get license for download txt file*/
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
  }

  /* Add or remove class to sidebar*/
  showSidebar(value){
    if (value){
      $('.sidebar').addClass('active');
    } else {
      $('.sidebar').removeClass('active');
    }

    this.sidebarActive = value;
  }

  /* Add or remove class for active or owners or project users */
  showUsers(){
    $('.users').addClass('active');
    $('.owners').removeClass('active');

    $("#projectOwners").hide();
    $("#users").fadeIn();
  }

  /* Add or remove class for active or owners or project owners */
  showOwners(){
    $('.owners').addClass('active');
    $('.users').removeClass('active');

    $("#users").hide();
    $("#projectOwners").fadeIn();

  }

  /*Show one by one answers on the right side of the page */
  showAnswer(event){
    let id = event.srcElement.className;
    let prev = $(".question.active span")
    let elem = $("#"+id)

    let div = $("#div_"+id)
    if (elem.css('display') == 'none'){
      div.addClass('active')
      elem.slideToggle();
      elem.css('display', 'block');
      if (prev != elem)
        prev.slideToggle();
        prev.parent().removeClass('active');
    }
    else{
      elem.slideToggle();
      div.removeClass('active');
    }
  }

  /* Load the script element form body and also when loads page remove the active class*/
  ngOnInit(){
    var script = document.createElement('script');
    document.body.appendChild(script)
    script.src = 'https://buttons.github.io/buttons.js'
    $(document).click(function(e) {
                var target = $(e.target), article;
                if(!target.parents().is(".sidebar") && !target.is(".sidebar") && !target.is(".faq")) {
                    if($(".sidebar").hasClass("active")) {
                        $(".sidebar").removeClass("active");
                    }
                }
            })

  }
  refresh(): void {
    window.location.reload();
}

 }
