import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SignUpComponent } from './sign-up.component';
import { FormsModule} from '@angular/forms'
import { MaterialModule } from '../material.module';
import { SignUpService } from '../sign-up/sign-up.service';
import { HttpClientModule } from '@angular/common/http';


describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MaterialModule,
        HttpClientModule
      ],
      providers:[ SignUpService ]
     
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
    component.successfullyRegistrated = true;
    component.isRegisterClicked = true
    fixture.detectChanges()
    let de = fixture.debugElement.query(By.css('p'))
    let el:HTMLElement = de.nativeElement;

    expect(el.innerText).toBe('הרישום עבר בהצלחה, נשלח לך מייל ברגע שהמשתמש יאומת')
  })

  it('should display error message if registration failed',()=>{
    component.successfullyRegistrated = false;
    component.isRegisterClicked = true;
    fixture.detectChanges()
    let de = fixture.debugElement.query(By.css('.error'))
    let el:HTMLElement = de.nativeElement;

    expect(el.innerText).toBe('משהו השתבש, נסה עוד פעם או דווח למפתח האתר.')
  })

  it('should not dispaly any registration status uponn opening registration',()=>{
    let de = fixture.debugElement.query(By.css('.container'))
    let el:HTMLElement = de.nativeElement;
    
    console.dir(el)
   
    expect(el.innerText).not.toContain('משהו השתבש, נסה עוד פעם או דווח למפתח האתר.')
  })
  
});

