import 'jest-preset-angular/setup-jest';
import { TestBed } from '@angular/core/testing';
import { CoreModule } from 'src/app/modules/core/core.module';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [CoreModule],
  }).compileComponents();
});