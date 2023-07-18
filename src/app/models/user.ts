export type User = {
  fullName: string;
  gender: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
  type: 'admin' | 'doctor' | 'nurse';
};
