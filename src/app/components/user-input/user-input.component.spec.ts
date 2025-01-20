import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInputComponent } from './user-input.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';

describe('UserInputComponent', () => {
  let component: UserInputComponent;
  let fixture: ComponentFixture<UserInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInputComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the button when userInput is empty or only spaces', () => {
    component.userInput = ''; // Test empty string
    component.checkDisabled();
    expect(component.disableButton).toBeTrue();

    component.userInput = '   '; // Test spaces
    component.checkDisabled();
    expect(component.disableButton).toBeTrue();
  });

  it('should enable the button when userInput has non-space characters', () => {
    component.userInput = 'Hello'; // Test valid input
    component.checkDisabled();
    expect(component.disableButton).toBeFalse();
  });

  it('should reset message after sent', () => {
    component.userInput = 'Hello';
    component.onSendMessage();
    expect(component.userInput).toEqual('');
  });
});
