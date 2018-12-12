import { PagesModule } from './pages.module';

xdescribe('PagesModule', () => {
  let pagesModule: PagesModule;

  beforeEach(() => {
    pagesModule = new PagesModule();
  });

  it('should create an instance', () => {
    expect(pagesModule).toBeTruthy();
  });
});
