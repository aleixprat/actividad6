import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})

export class CreateUpdateComponent {
  formularioUser : FormGroup;

  constructor() {
    this.formularioUser = new FormGroup({
      first_name: new FormControl("",[  
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl("",[
        Validators.required,
        Validators.minLength(3)
      ]),
      username: new FormControl("",[
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl("",[
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      image: new FormControl("",[
        Validators.required,
        Validators.pattern(/^(?:https?:\/\/)?(?:www\.)?[\w.-]+\.[a-z]{2,}(?:\/\S*)?$/i)
      ]),
      password: new FormControl("",[
        Validators.required,
        Validators.minLength(3)
      ]),
      repite_password: new FormControl("",[
        Validators.required,
        Validators.minLength(3)
      ])
    }, [this.validarPassword])
  }

  validarPassword(valorForm: AbstractControl) {
    const password: string = valorForm.get('password')?.value;
    const repite_password: string = valorForm.get('repite_password')?.value;

    if (password !== repite_password) {
      return { 'checkpassword': true }
    }
    return null

  }

  controlError(nombreCampo: string, tipoError: string): boolean {
    if (this.formularioUser.get(nombreCampo)?.hasError(tipoError) && 
        this.formularioUser.get(nombreCampo)?.touched) 
    {
      return true
    }
    return false
  }

  getForm() : void {
    console.log(this.formularioUser.value);
  }
}
