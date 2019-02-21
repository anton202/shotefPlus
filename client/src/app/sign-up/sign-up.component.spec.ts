import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SignUpComponent } from './sign-up.component';
import { FormsModule} from '@angular/forms'
import { MaterialModule } from '../material.module';


describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MaterialModule
      ]
     
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render seccesfuly registered message',()=>{
    component.registretitonCompleated = true;
    fixture.detectChanges()
    let de = fixture.debugElement.query(By.css('p'))
    let el:HTMLElement = de.nativeElement;

    expect(el.innerText).toBe('הרישום עבר בהצלחה, נשלח לך מייל ברגע שהמשתמש יאומת')
  })

  
});

