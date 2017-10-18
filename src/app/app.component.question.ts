export class Question{
  public yes: any
  public no: any
  public yes_hint: any
  public no_hint: any
  public answer: any
  public question: any
  public hasChilds: boolean
  public jsonData: any
  public license: any
  constructor(){}

  setData(jsonData:any){
    this.jsonData = jsonData;
    this.yes_hint = jsonData.yes;
    this.no_hint = jsonData.no
    if (jsonData.question){
      this.question = jsonData.question;

      this.makeChilds();
    } else{
      this.license = jsonData.license
    }
  }
  makeChilds(){
    if (this.jsonData.question){
      this.jsonData.children.forEach((child:any) =>{
        if (child.label.toLowerCase() == 'yes'){
          this.yes = new Question();
          this.yes.setData(child);
        }else{
          this.no = new Question();
          this.no.setData(child);
        }
      })
      this.hasChilds = true;
    }else{
      this.hasChilds = false;
    }
  }

  getNext(){
    if (this.hasChilds){
      return this.answer == 'yes'? this.yes : this.no;
  }
}
}
