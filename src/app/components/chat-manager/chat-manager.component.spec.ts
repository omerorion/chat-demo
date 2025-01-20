import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatManagerComponent } from './chat-manager.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';

describe('ChatManagerComponent', () => {
  let component: ChatManagerComponent;
  let fixture: ComponentFixture<ChatManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatManagerComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
