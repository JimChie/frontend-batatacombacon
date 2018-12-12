import { TestBed, async, inject } from '@angular/core/testing';

import { ProfileGuard } from './profile.guard';

xdescribe('ProfileGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileGuard]
    });
  });

  it('should ...', inject([ProfileGuard], (guard: ProfileGuard) => {
    expect(guard).toBeTruthy();
  }));
});
