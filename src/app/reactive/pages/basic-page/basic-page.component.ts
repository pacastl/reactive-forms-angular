import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


const rtx4090= {
  name: 'RTX 4090',
  price: '2500',
  inStorage: '7'
}


@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

  // Primera forma de crear formulario
  // public myForm:FormGroup = new FormGroup({
  // El primer [] es para validaciones síncronas
  // El segundo [] es para validaciones asíncronas
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // })

  // Segunda forma de crear formulario
  public myForm: FormGroup = this.fb.group({
  // El primer [] despues de  '' es para validaciones síncronas
  // El segundo [] es para validaciones asíncronas
  name: ['', [ Validators.required, Validators.minLength(3) ] ],
  price: [0, [ Validators.required, Validators.min(0) ] ],
  inStorage: [0, [ Validators.required, Validators.min(0) ]],
  })



  constructor(private fb: FormBuilder) {

  }


  onSave():void{
    if(this.myForm.invalid){
      // Dispara todas las validaciones porque indica que los campos se han tocado
      // Así que al darle a guardar veremos los mensajes de error de cada campo mal rellenado
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

    // Podemos pasar un objeto con las propiedades para reseatar
    // el formulario con esos valores
    this.myForm.reset({price: 10, inStorage:0});
  }

  // Inicializamos el formulario con esos valores
  ngOnInit(): void {
    // this.myForm.reset(rtx4090);
  }

  isValidField(field:string):boolean | null{
    // Errors es un objeto, por lo que si no hay errores es nulo
    return this.myForm.controls[field].errors
    &&
    this.myForm.controls[field].touched;
  }

  getFieldError(field:string):string | null{

    // si el formulario no tiene el campo, entonces devolvemos nada
    if (!this.myForm.controls[field]) return null;

    const errors= this.myForm.controls[field].errors || {};

    for(const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'Este campo es requerido';

          case 'minlength':
            return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
      }
    }

    return null;

  }
}
