import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PokeApiService } from './poke-api.service'
import { PokemonServiceModule } from './poke-api.service.module';
import { CoreModule } from 'src/app/modules/core/core.module';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

export const StoreMock = {
  dispatch: jest.fn(() => {
    return {};
  }),
  select: jest.fn(() => {
    return {};
  }),
  pipe: jest.fn(() => {
    return of(undefined);
  }),
};

describe('PokeApiService', () => {
  let service: PokeApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PokemonServiceModule,
      ],
    });
    service = TestBed.inject(PokeApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
