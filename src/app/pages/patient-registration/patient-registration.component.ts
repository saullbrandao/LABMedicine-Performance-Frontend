import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl,ValidationErrors } from "@angular/forms";
import { Patient } from "../../models/patient";
import { Address } from 'src/app/models/address';
import { ViacepService } from 'src/app/services/viacep/viacep.service';



@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent {
  form: FormGroup;
  patientFormFieldOptions: {id: number, name: string}[] = [];
  editMode = false;
  header = 'Preencha os campos para cadastrar um novo paciente';
  confirmMessage = 'Este paciente será excluído. Confirma a operação?'


  constructor(
    private formBuilder: FormBuilder,
    private viaCepService: ViacepService
  ){
    this.form = this.formBuilder.group(this.getFormData());
  }


  getFormData(patient: Patient | undefined = undefined) {
    return {
      id: [ patient?.id || 0 ],
      name: [
        patient?.name || '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64)
        ]
      ],
      gender: [
        patient?.gender || '',
        [
          Validators.required,
          this.genderValidator
        ]
      ],
      birthDate: [
        patient?.birthDate || '',
        [ Validators.required,
          this.dateValidator
        ]
      ],
      cpf: [
        patient?.cpf || '',
        [
          Validators.required
        ]
      ],
      rg: [
        patient?.rg || '',
        [
          Validators.required,
          Validators.max(20)
        ]
      ],
      maritalStatus:  [
        patient?.maritalStatus  || '',
        [
          Validators.required
        ]
      ],
      phone: [
        patient?.phone || '',
        [
          Validators.required,
          Validators.pattern(/^\(\d{2}\)\s\d\s\d{4}-\d{5}$/)
        ]
      ],
      email: [
        patient?.email || '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      nationality: [
        patient?.nationality || '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64)
        ]
      ],
      emergencyContact: [
        patient?.emergencyContact || '',
        [
          Validators.required,
          Validators.pattern(/^\(\d{2}\)\s\d\s\d{4}-\d{5}$/)
        ]
      ],
      allergyList: [
        patient?.allergyList  || '',
      ],
      specificCareList : [
        patient?.specificCareList || ''
      ],
      healthInsurance : [
        patient?.healthInsurance || ''
      ],
      insuranceNumber : [
        patient?.insuranceNumber  || ''
      ],
      insuranceValidity : [
        patient?.insuranceValidity || '',
        [
          this.dateValidator
        ]
      ],
      cep:  [
        patient?.address.cep || '',
        [
          Validators.required
        ]
      ],
      city  :  [
        patient?.address.city  || '',
        [
          Validators.required
        ]
      ],
      state :  [
        patient?.address.state  || '',
        [
          Validators.required
        ]
      ],
      street :  [
        patient?.address.street  || '',
        [
          Validators.required
        ]
      ],
      number :  [
        patient?.address.number  || '',
        [
          Validators.required
        ]
      ],
      complement :  [
        patient?.address.complement  || '',

      ],
      neighborhood :  [
        patient?.address.neighborhood  || '',
        [
          Validators.required
        ]
      ],
      referencePoint  :  [
        patient?.address.referencePoint   || ''
      ],
      systemStatus  :  [
        patient?.status  || '',
        [
          Validators.required
        ]
      ]
    }
  }

  isInvalid(input: string) {
    return this.form.get(input)?.invalid && this.form.get(input)?.touched;
  }


  genderValidator(control: FormControl): ValidationErrors | null {
    const value = control.value?.toLowerCase();

    if (value !== 'm' && value !== 'f') {
      return { genderInvalid: true };
    }

    return null;
  }

  onSubmit() {
    if(!this.form.valid) {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control?.markAllAsTouched();
      });

      return;
    }

  }


  formReset(){
    this.form = this.formBuilder.group(this.getFormData());
  }

  delete(){

  }

  dateValidator (control: FormControl): ValidationErrors | null {
      if (!control.value) {
        return null; // Se o campo estiver vazio, a validação será considerada bem-sucedida.
      }

      const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;

      if (!datePattern.test(control.value)) {
        return { invalidDateFormat: true };
      }

      const [day, month, year] = control.value.split('/');
      const dateObject = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

      if (
        dateObject.getFullYear() !== parseInt(year) ||
        dateObject.getMonth() + 1 !== parseInt(month) ||
        dateObject.getDate() !== parseInt(day)
      ) {
        return { invalidDate: true };
      }

      return null; // Data válida, retorno null indicando sucesso na validação.
    };

    handleCepBlur(){
        const cep = this.form.get('cep')!.value;
        if(cep.length === 8){
          if(window.confirm('Deseja Consultar o Cep?')){
            this.viaCepService.getAdressbyCep(cep).subscribe(
             ( endereco: any) =>{
                this.form.patchValue({
                  city: endereco.localidade,
                  state: endereco.uf,
                  street: endereco.logradouro,
                  neighborhood: endereco.bairro
                })
             },
             (error) => {
              console.log('erro');
            }
             )


          }
        }
    }

}


