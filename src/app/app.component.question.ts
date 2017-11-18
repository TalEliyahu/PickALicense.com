export class Question{
  
  private q_number: any;
  public jsonData: any;
  public yes: any;
  public no: any;
  public answer = 'yes';
  
  constructor(private core){}

  /* set data for questions */
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

  /* for next button event for answers*/
  getNext(){
    return this[this.answer];
  }

   /* get questions for answers*/
  getQuestion(){
    return this.core.questionire[this.q_number].question;
  }

  getHint(){
    return this.core.questionire[this.q_number][this.answer];
  }

  /* yes or no button for answers */
  switch(){
    this.answer = this.answer == 'yes'?'no':'yes';
  }
}
