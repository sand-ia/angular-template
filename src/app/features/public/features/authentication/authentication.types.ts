export type Field = {
  type: string;
  label: string;
  controlName: string;
};

export enum FormType {
  Login,
  UserType,
  Register,
  EmailValidation,
  ForgotPassword,
  ResetPassword,
}

export enum UserType {
  Natural = 'PN',
  Juridica = 'PJ',
}

export type RegisterGeneralForm = {
  documentType: string;
  documentNumber: number;
};

export type RegisterGeneralFormWithNaturalFields = {
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName?: string;
} & RegisterGeneralForm;

export type RegisterGeneralFormWithJuridicaFields = {
  companyName: string;
} & RegisterGeneralForm;

export type RegisterResidentialForm = {
  country: number;
  state: number;
  city: number;
  address: string;
  phone: string;
  alternativePhone: string;
};

export type RegisterSecurityForm = {
  email: string;
  password: string;
  acceptanceTerms: boolean;
  policyTerms: boolean;
};
