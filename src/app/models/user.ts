export type User = {
  name: string;
  gender: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
  type: 'ADMIN' | 'MEDICO' | 'ENFERMEIRO';
};
