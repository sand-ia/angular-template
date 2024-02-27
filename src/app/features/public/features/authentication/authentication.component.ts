import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidatorService } from '../../../../core/services/form-validator.service';
import { ActivatedRoute } from '@angular/router';
import {
  Field,
  UserType,
  FormType,
  RegisterGeneralFormWithJuridicaFields,
  RegisterGeneralFormWithNaturalFields,
  RegisterResidentialForm,
  RegisterSecurityForm,
} from './authentication.types';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import {
  CreateAccountRequest,
  Credentials,
  Country,
  State,
  City,
  UpdatePasswordRequest,
} from '../../../../core/services/authentication.service.types';
import { MatSelectChange } from '@angular/material/select';
import { HttpErrorResponse } from '@angular/common/http';
import { delay } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit, AfterViewInit {
  protected UserType = UserType;
  protected FormType = FormType;
  protected loginError: string | null = null;
  protected userType: UserType | undefined = undefined;
  protected selectedFormType = FormType.Login;
  protected isLoading: boolean = false;
  protected isEmailWrong: boolean = false;
  protected isMessageHidden: boolean = true;
  protected isResetPwsUrl: boolean = false;

  protected loginForm!: FormGroup;
  protected updatedPasswordForm!: FormGroup;
  protected registerForm!: FormGroup;
  protected registerGeneralForm!: FormGroup;
  protected registerResidentialForm!: FormGroup;
  protected registerSecurityForm!: FormGroup;
  protected resetPasswordForm!: FormGroup;

  protected registerGeneralFormFields: Field[] = [];

  protected countries: Country[] = [];
  protected states: State[] = [];
  protected cities: City[] = [];
  protected tokenToResetPassword: string = '';

  private temporalEmailBackup: string | null = null;
  private temporalPasswordBackup: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private formValidatorService: FormValidatorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authenticationService
      .getCountries()
      .subscribe((countries: Country[]) => {
        this.countries = countries;
      });
    this.buildResetPasswordForm();
    this.buildLoginForm();
    this.buildRegisterForm();
    this.buildUpdatedPasswordForm();
  }

  ngAfterViewInit() {
    this.detectCurrectURL();
  }

  protected detectCurrectURL(): void {
    const currentPath = this.router.url;
    const pathWithoutQuery = currentPath.split('?')[0];
    if (pathWithoutQuery === '/reset_password') {
      this.selectFormType(this.FormType.ResetPassword);
      const token = this.route.snapshot.queryParamMap.get('token');
      if (token) this.tokenToResetPassword = token;
      console.log('token', token);
    }
  }

  protected getStates(change: MatSelectChange): void {
    const idCountry = change.value as number;
    if (!idCountry) return;
    this.authenticationService
      .getStates(idCountry)
      .subscribe((states: State[]) => {
        this.states = states;
        this.registerResidentialForm.get('state')?.setValue('');
        this.registerResidentialForm.get('city')?.setValue('');
      });
  }

  protected getCities(change: MatSelectChange): void {
    const idState: number = change.value as number;
    if (!idState) return;
    this.authenticationService
      .getCities(idState)
      .subscribe((cities: City[]) => {
        this.cities = cities;
        this.registerResidentialForm.get('city')?.setValue('');
      });
  }

  protected selectFormType(formName: FormType): void {
    this.loginForm.reset();
    this.registerForm.reset();
    this.selectedFormType = formName;
  }

  protected login(): void {
    if (!this.loginForm.valid) return;

    const credentials = this.loginForm.value as Credentials;
    this.isLoading = true;
    this.authenticationService.login(credentials).subscribe(
      () => {
        this.router.navigate(['home']);
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.isLoading = false;
          this.loginError = 'Correo o contraseña incorrectos';
          this.loginForm.reset();
        }
        if (err.status == 403) {
          this.isLoading = false;
          this.temporalEmailBackup = credentials.email;
          this.selectedFormType = this.FormType.EmailValidation;
          this.temporalPasswordBackup = null;
          delay(30000);
          this.loginForm.reset();
        }
      }
    );
  }

  protected onSubmitRegisterForm(): void {
    if (!this.registerForm.valid) return;

    const registerGeneralForm = this.registerGeneralForm.value as
      | RegisterGeneralFormWithNaturalFields
      | RegisterGeneralFormWithJuridicaFields;
    const registerResidentialForm = this.registerResidentialForm
      .value as RegisterResidentialForm;
    const registerSecurityForm = this.registerSecurityForm
      .value as RegisterSecurityForm;

    const createAccountRequest: CreateAccountRequest = {
      ...registerGeneralForm,
      city: registerResidentialForm.city,
      address: registerResidentialForm.address,
      phone: registerResidentialForm.phone,
      alternativePhone: registerResidentialForm.alternativePhone,
      email: registerSecurityForm.email,
      password: registerSecurityForm.password,
      acceptanceTerms: registerSecurityForm.acceptanceTerms,
      policyTerms: registerSecurityForm.policyTerms,
      userType: this.userType!,
      documentType:
        this.userType === UserType.Natural
          ? registerGeneralForm.documentType
          : 'NIT',
    };

    this.temporalEmailBackup = registerSecurityForm.email;
    this.temporalPasswordBackup = registerSecurityForm.password;

    this.isLoading = true;
    this.authenticationService.createAccount(createAccountRequest).subscribe(
      () => {
        this.isLoading = false;
        this.loginForm.reset();
        this.loginForm.get('email')?.setValue(this.temporalEmailBackup);
        this.loginForm.get('password')?.setValue(this.temporalPasswordBackup);
        this.login();
        this.registerForm.reset();
      },
      err => {
        if (err.status == 400) {
          //TODO:manejar el error
        }
      }
    );
  }

  protected sendValidationEmail(): void {
    const email = this.temporalEmailBackup ? this.temporalEmailBackup : '';

    this.isLoading = true;
    this.isMessageHidden = false;
    this.authenticationService.sendValidationEmail(email).subscribe(() => {
      this.isLoading = false;
      this.isMessageHidden = false;
      delay(30000);
      this.selectedFormType = this.FormType.Login;
    });
  }

  protected changePassword(): void {
    this.selectedFormType = this.FormType.ForgotPassword;
  }

  protected recoverPassword(): void {
    if (this.updatedPasswordForm.valid) {
      this.isEmailWrong = false;
      let email: string = '';
      const userEmail = this.updatedPasswordForm.get('email');
      if (userEmail) email = userEmail.value;

      if (email) {
        this.isLoading = true;
        this.authenticationService.resetPassword(email).subscribe(
          () => {
            this.isLoading = false;
            this.selectFormType(this.FormType.Login);
          },
          (error: HttpErrorResponse) => {
            if (error.status == 404) {
              this.isLoading = false;
              this.isEmailWrong = true;
            }
            if (error.status >= 500 && error.status <= 600) {
              this.isLoading = false;
            }
          }
        );
      }
    }
  }

  protected updatedPassword(): void {
    if (
      this.resetPasswordForm.valid &&
      this.resetPasswordForm.get('password')
    ) {
      this.isLoading = true;
      let password = '';
      const passwordFiled = this.resetPasswordForm.get('password');
      if (passwordFiled) password = passwordFiled.value;
      const updatePasswordData: UpdatePasswordRequest = {
        token: this.tokenToResetPassword,
        password: password,
      };
      this.authenticationService.updatePassword(updatePasswordData).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(['login']);
        },
        (error: HttpErrorResponse) => {
          if (error.status == 404) {
            this.isLoading = false;
          }
          if (error.status >= 500 && error.status <= 600) {
            this.isLoading = false;
          }
        }
      );
    }
  }

  protected onChangeUserType(userType: UserType): void {
    this.userType = userType;
    if (this.userType === UserType.Natural)
      this.updateGeneralFormWithNaturalValidations();
    else this.updateGeneralFormWithJuridicaValidations();
  }

  private updateGeneralFormWithNaturalValidations(): void {
    this.registerGeneralForm.removeControl('companyName');
    this.registerGeneralForm.addControl(
      'documentType',
      this.formBuilder.control('', Validators.required.bind(Validators))
    );
    this.registerGeneralForm.addControl(
      'firstName',
      this.formBuilder.control('', [
        Validators.required.bind(Validators),
        Validators.minLength(3),
      ])
    );
    this.registerGeneralForm.addControl(
      'middleName',
      this.formBuilder.control('', [Validators.minLength(3)])
    );
    this.registerGeneralForm.addControl(
      'lastName',
      this.formBuilder.control('', [
        Validators.required.bind(Validators),
        Validators.minLength(3),
      ])
    );
    this.registerGeneralForm.addControl(
      'secondLastName',
      this.formBuilder.control('', [Validators.minLength(3)])
    );
  }

  private updateGeneralFormWithJuridicaValidations(): void {
    this.registerGeneralForm.removeControl('documentType');
    this.registerGeneralForm.removeControl('firstName');
    this.registerGeneralForm.removeControl('middleName');
    this.registerGeneralForm.removeControl('lastName');
    this.registerGeneralForm.removeControl('secondLastName');
    this.registerGeneralForm.addControl(
      'companyName',
      this.formBuilder.control('', [
        Validators.required.bind(Validators),
        Validators.minLength(3),
      ])
    );
  }

  private buildLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  private buildResetPasswordForm(): void {
    this.resetPasswordForm = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required.bind(Validators),
            Validators.minLength(6),
            Validators.maxLength(50),
          ],
        ],
        confirmPassword: ['', Validators.required.bind(Validators)],
      },
      {
        validator: [
          FormValidatorService.matchFieldsValidator(
            'password',
            'confirmPassword'
          ),
        ],
      }
    );
  }

  private buildUpdatedPasswordForm(): void {
    this.updatedPasswordForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required.bind(Validators),
          FormValidatorService.email.bind(FormValidatorService),
        ],
      ],
    });
  }

  private buildRegisterForm(): void {
    this.registerGeneralForm = this.formBuilder.group({
      documentType: ['', Validators.required.bind(Validators)],
      documentNumber: [
        '',
        [
          Validators.required.bind(Validators),
          Validators.minLength(4).bind(Validators),
          FormValidatorService.numberValidator.bind(FormValidatorService),
          Validators.maxLength(15),
        ],
      ],
      companyName: [
        '',
        [
          Validators.required.bind(Validators),
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      firstName: [
        '',
        [
          Validators.required.bind(Validators),
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      middleName: ['', [Validators.minLength(3), Validators.maxLength(25)]],
      lastName: [
        '',
        [
          Validators.required.bind(Validators),
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      secondLastName: ['', [Validators.minLength(3), Validators.maxLength(25)]],
    });

    this.registerResidentialForm = this.formBuilder.group({
      country: ['', Validators.required.bind(Validators)],
      state: ['', Validators.required.bind(Validators)],
      city: ['', Validators.required.bind(Validators)],
      address: [
        '',
        [
          Validators.required.bind(Validators),
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      phone: [
        '',
        [
          Validators.required.bind(Validators),
          Validators.minLength(10),
          Validators.maxLength(10),
          FormValidatorService.numberValidator.bind(FormValidatorService),
        ],
      ],
      alternativePhone: [
        '',
        [
          Validators.minLength(10),
          Validators.maxLength(10),
          FormValidatorService.numberValidator.bind(FormValidatorService),
        ],
      ],
    });

    this.registerSecurityForm = this.formBuilder.group(
      {
        email: [
          '',
          {
            validators: [
              Validators.required.bind(Validators),
              FormValidatorService.email.bind(FormValidatorService),
              Validators.minLength(15),
              Validators.maxLength(50),
            ],
            asyncValidators: [this.formValidatorService.checkEmailExists()],
            updateOn: 'blur',
          },
        ],
        confirmEmail: ['', Validators.required.bind(Validators)],
        password: [
          '',
          [
            Validators.required.bind(Validators),
            Validators.minLength(6),
            Validators.maxLength(50),
          ],
        ],
        confirmPassword: ['', Validators.required.bind(Validators)],
        acceptanceTerms: [
          false,
          FormValidatorService.toggleRequiredTrue.bind(FormValidatorService),
        ],
        policyTerms: [
          false,
          FormValidatorService.toggleRequiredTrue.bind(FormValidatorService),
        ],
      },
      {
        validator: [
          FormValidatorService.matchFieldsValidator('email', 'confirmEmail'),
          FormValidatorService.matchFieldsValidator(
            'password',
            'confirmPassword'
          ),
        ],
      }
    );

    this.registerForm = this.formBuilder.group({
      registerGeneralForm: this.registerGeneralForm,
      registerResidentialForm: this.registerResidentialForm,
      registerSecurityForm: this.registerSecurityForm,
    });
  }
}
