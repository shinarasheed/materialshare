import { CmPage } from './app.po';

describe('cm App', () => {
  let page: CmPage;

  beforeEach(() => {
    page = new CmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
