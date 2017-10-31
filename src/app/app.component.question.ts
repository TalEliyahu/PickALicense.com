export class Question{
  private q_number: any;
  public jsonData: any;
  public yes: any;
  public no: any;
  public answer = 'yes';
  constructor(private core){}

  setData(jsonData:any){
    this.jsonData = jsonData;
    this.q_number = jsonData.question;
    this.yes = jsonData.yes;
    this.no = jsonData.no
    if (typeof this.yes == 'object'){
      this.yes = new Question(this.core);
      this.yes.setData(this.jsonData.yes);
    }
    if (typeof this.no == 'object'){
      this.no = new Question(this.core);
      this.no.setData(this.jsonData.no);
    }
  }

  getNext(){
    console.log(this[this.answer])
    return this[this.answer];
  }

  getQuestion(){
    return this.core.questionire[this.q_number].question;
  }
  getHint(){
    return this.core.questionire[this.q_number][this.answer];
  }

  switch(){
    this.answer = this.answer == 'yes'?'no':'yes';
    console.log(this.answer);
  }
}
