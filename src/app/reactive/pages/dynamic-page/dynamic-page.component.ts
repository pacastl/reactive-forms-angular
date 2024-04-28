import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  // public myForm2=new FormGroup({
  //   favouriteGames: new FormArray([])
  // });

  public myForm: FormGroup=this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favouriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ])
  });

  public newFavourite:FormControl = new FormControl('',[Validators.required]);

  constructor(private fb:FormBuilder){ }

  onSubmit():void{
    // si no es válido
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset();
  }

  get favouriteGames(){
    return this.myForm.get('favouriteGames') as FormArray;
  }

  isValidField(field:string):boolean | null{
    // Errors es un objeto, por lo que si no hay errores es nulo
    return this.myForm.controls[field].errors
    &&
    this.myForm.controls[field].touched;
  }

  isValidFieldInArray(formArray:FormArray,index:number){
    return formArray.controls[index].errors
    && formArray.controls[index].touched;
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

  onDeleteFavourite(index:number):void{
    // En javascript todo pasa por referencia así que lo elimina en el array directamente
    this.favouriteGames.removeAt(index);
  }

  onAddToFavourites():void{
    if(this.newFavourite.invalid) return;

    const newGame=this.newFavourite.value;

    // Si no estuvierámos trabajando con FormBuilder lo haríamos así
    // this.favouriteGames.push (new FormControl(newGame,Validators.required));

    this.favouriteGames.push(
      this.fb.control(newGame,Validators.required)
    );

    // Vaciamos los valores de favoritos
    (this.myForm.controls['favouriteGames'] as FormArray) = this.fb.array([]);
    // Al guardar el valor, reseteamos el input para poder escribir otro y resetar pristine, touched... para las validaciones
    this.newFavourite.reset();

  }


}
