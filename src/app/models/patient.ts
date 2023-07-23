import { Address } from "./address";

export type Patient = {
  id: number,
  name: string,
  gender: string,
  birthDate: string,
  cpf: string,
  rg: string,
  maritalStatus: string,
  phone: string,
  email: string,
  nationality: string,
  emergencyContact: string,
  allergyList: string,
  specificCareList: string
  healthInsurance: string,
  insuranceNumber: number,
  insuranceValidity: string,
  status:boolean,
  address: Address
}
