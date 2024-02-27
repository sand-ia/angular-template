export type User = {
  id: number;
  name: string;
  email: string;
  roles: string[];
  userType: string;
};

export type AppUser = {
  idUser: number;
  documentNumber: string;
  email: string;
  userType: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  address: string;
  phone: string;
  enabled: boolean;
};

export type Credentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
};

export type Payload = {
  id: number;
  name: string;
  email: string;
  authorities: string[];
  user_type: string;
  exp: number;
};

export type UpdatePasswordRequest = {
  token: string;
  password: string;
};
export type CreateAccountRequest = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  secondLastName?: string;
  companyName?: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  alternativePhone: string;
  documentType: string;
  documentNumber: number;
  userType: string;
  city: number;
  acceptanceTerms: boolean;
  policyTerms: boolean;
};

export type Country = {
  idCountry: number;
  name: string;
};
export type State = {
  idState: number;
  name: string;
};

export type City = {
  idCity: number;
  name: string;
};
