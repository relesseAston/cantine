import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { IngredientService } from './ingredient.service';
import { TokenStorageService } from './token-storage.service';

describe('IngredientService', () => {
  let service: IngredientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, {provide:HttpHeaders, useValue: {}}, HttpHandler, TokenStorageService]
    });
    service = TestBed.inject(IngredientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
