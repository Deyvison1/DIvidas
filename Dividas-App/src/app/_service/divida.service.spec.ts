/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DividaService } from './divida.service';

describe('Service: Divida', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DividaService]
    });
  });

  it('should ...', inject([DividaService], (service: DividaService) => {
    expect(service).toBeTruthy();
  }));
});
