import { AngularCliHerokuPage } from './app.po';

describe('angular-cli-heroku App', () => {
  let page: AngularCliHerokuPage;

  beforeEach(() => {
    page = new AngularCliHerokuPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
