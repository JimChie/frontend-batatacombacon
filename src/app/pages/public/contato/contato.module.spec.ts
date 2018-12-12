import { ContatoModule } from './contato.module';

xdescribe('ContatoModule', () => {
  let contatoModule: ContatoModule;

  beforeEach(() => {
    contatoModule = new ContatoModule();
  });

  it('should create an instance', () => {
    expect(contatoModule).toBeTruthy();
  });
});
