import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have header with "Demo Chat"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const element: HTMLElement = fixture.nativeElement;
    const div = element.getElementsByClassName('header')![0];
    expect(div.textContent).toEqual('Chat Demo');
  });
});
