import { TestBed, async, inject } from '@angular/core/testing';

import { EditPetGuard } from './edit-pet.guard';

xdescribe('EditPetGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditPetGuard]
    });
  });

  it('should ...', inject([EditPetGuard], (guard: EditPetGuard) => {
    expect(guard).toBeTruthy();
  }));
});
