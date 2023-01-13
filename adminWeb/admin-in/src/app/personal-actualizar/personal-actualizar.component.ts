import { Component, OnInit, NgModule } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { PersonalOpModel } from '../models/personalOp.models';
import { SucursalModel } from '../models/sucursal.model';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective} from '@angular/forms';
import * as moment from "moment";
import { InfPersonalService } from '../services/inf-personal.service';
import { ClienteWAService } from '../services/cliente-wa.service';
import { Router } from '@angular/router';
import { ModalMensajeriaComponent } from '../components/modals/modal-mensajeria/modal-mensajeria.component';
import { HttpClient } from '@angular/common/http';
import { EstadoModel } from '../models/estado.model';


@Component({
  selector: 'app-personal-actualizar',
  templateUrl: './personal-actualizar.component.html',
  styleUrls: ['./personal-actualizar.component.css']
})
export class PersonalActualizarComponent implements OnInit {

  //Mensaje de error
  mensajeError = "";
  mensajeErrorCorreo = "";
  editable:boolean=false
  actualizado!:boolean | null

  //Variable para el modal
    display = 'none';

    //Cedula a usar para encontrar id del admin
    cedula_Admin = 0

    //Variables de campos completados del registro y de confirmacion de que se han aceptado los términos y condiciones
    camposCompletos: boolean = false;

    //Lista de sucursales para el registro
    lista_Sucursales?: SucursalModel[];
  
    sucursal_De_Personal!: Number

    //Lista de estados
    estado_activo: EstadoModel = {
      idEstado: 1,
      estado: "Activo"
    }
    estado_en_espera: EstadoModel = {
      idEstado: 2,
      estado: "En espera"
    }
    lista_Estados: EstadoModel[] = [this.estado_activo, this.estado_en_espera]
    

    //Variable para indicar que no existe servicio a editar y muestra boton de regresar a pagina principal
    inexistente!: boolean | null

    //Variable que se usa para presentar los datos del personal
    personal: PersonalOpModel = new PersonalOpModel();
  
    title = 'email-validation-tutorial';
    userEmail = new FormControl({
      correo: new FormControl('',[
        Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        secondaryEmail: new FormControl('',[
          Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    });
    
    user: PersonalOpModel = new PersonalOpModel();
    fechaRegistro = new Date();
    rol: string ='2';
  
    ppp: boolean = true;
    //varComb: boolean = this.varPUno && this.varPDos;
  
    registerForm!: FormGroup;
    hide = true;
    //Indicador si registro fue guardado en la base de datos o no
    submitted = false;
  
    //Bandera creada para indicar que la cuenta fue creada y así cambiar el mensaje de retroalimentacion
    exito = false;
  
    esMayorEdad: boolean = false;
    p: boolean = false;

    //Variable que confirma eliminacion del personal
    eliminado!:boolean | null

    //Variable para setear checks por default para inventario
    check_conduccion = false
    check_armamento = false

    //Variable que se usa para presentar los datos actualizados del personal
    personal_actualizar: PersonalOpModel =  {
      numCedula: "",
      apellidos: "",
      nombres: "",
      fechaNac: new Date(),
      profesion: "",
      sexo: "",
      direccion: "",
      telefono: 0, 
      correo: "",
      fechaRegistro: new Date(),
      sucursal: 0,
      estado: 0,
      cargo: "",
      fotoOp: "",
      licencia_conductor: false,
      licencia_uso_armamento: false
    }



    constructor(private formBuilder: FormBuilder, 
      private _infPersonalService: InfPersonalService,
      private router:Router,
      private clienteWAService: ClienteWAService,
      private http: HttpClient
      ) { 
        console.log(router.url)
      }
  
    ngOnInit(): void {

      console.log("esta tontera es: " + localStorage.getItem("cedula_personalOp"))

      const info_personalOp = JSON.parse(localStorage.getItem("detalles_personal")!)
      this.personal.fechaNac = info_personalOp.fechaNac
      this.personal.fechaRegistro = info_personalOp.fechaRegistro
      this.personal.numCedula = info_personalOp.numCedula
      this.personal.apellidos = info_personalOp.apellidos
      this.personal.nombres = info_personalOp.nombres
      this.personal.profesion = info_personalOp.profesion
      this.personal.sexo = info_personalOp.sexo
      this.personal.direccion = info_personalOp.direccion
      this.personal.telefono = info_personalOp.telefono
      this.personal.correo = info_personalOp.correo
      this.personal.sucursal = info_personalOp.sucursal
      this.personal.estado = info_personalOp.estado
      this.personal.cargo = info_personalOp.cargo
      this.personal.licencia_conductor = info_personalOp.licencia_conductor
      this.personal.licencia_uso_armamento = info_personalOp.licencia_uso_armamento

      console.log("info personal")
      console.log(this.personal)
      console.log("Sucursal del personal")
      console.log(this.personal.sucursal)


      this.registerForm = this.formBuilder.group({
        'apellidos': {value:[this.personal.apellidos.toString(), [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]], disabled:!this.editable},
        'nombres': {value:[this.personal.nombres.toString(), [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]], disabled:!this.editable},
        'sexo': {value:[this.personal.sexo, [Validators.required]], disabled:!this.editable},
        'telefono':{value:[this.personal.telefono, [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern('^(0){1}(9){1}[0-9]{8}$')]], disabled:!this.editable},
        'direccion': {value:[this.personal.direccion, [Validators.required]], disabled:!this.editable},
        'profesion': {value:[this.personal.sexo, [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]], disabled:!this.editable},
        'fotoOp':[null],
        'estado': {value:[this.personal.estado, [Validators.required]], disabled:!this.editable},
        'sucursal': {value:[this.personal.sucursal, [Validators.required]], disabled:!this.editable} 
  
      });
      //this.permitirRegistro();
      this.obtener_Sucursales_Request();
      console.log("Luego de funcion obtener sucursal: " + this.sucursal_De_Personal)

      this.check_valores_estandar(this.personal.licencia_conductor, this.personal.licencia_uso_armamento)
      //this.validar_licencia_armamento();
      //this.validar_licencia_conduccion();
    }
  
    fecha(){
      console.log(this.user.fechaNac)
    }
    onRegisterSubmit(){
      /*alert(this.user.apellidos + ' ' + this.user.nombres + ' ' + this.user.cedula + ' ' + this.user + ' ' + 
      this.user.sexo+ ' '+ this.user.correo + ' ' + this.user.telefono + ' ' + this.user.contrasenia + ' ' +  this.direccion + ' ' +
      this.fechaRegistro + ' ' + this.rol);*/
    }
  
    /*Función para guardar usuario nuevo que se registre */
    actualizar_Personal_Operativo(): void {
      
      let elem = document.getElementById("mensajeDeConfirmacionDos") 
      if(elem?.innerHTML != undefined){
        elem.innerHTML = " ";
      }
      this.camposCompletos = !this.registerForm.invalid;
      const info_personal_actualizar = {
        apellidos : this.personal.apellidos,
        nombres : this.personal.nombres,
        numCedula : this.personal.numCedula,
        fechaNac : this.personal.fechaNac,
        sexo : this.personal.sexo,
        correo : this.personal.correo,
        telefono : this.personal.telefono,
        direccion : this.personal.direccion,
        profesion : this.personal.profesion,
        fotoOp : this.registerForm.get('fotoOp')?.value,
        sucursal : this.personal.sucursal,
        fechaRegistro : this.personal.fechaRegistro,
        estado : this.personal.estado,
        cargo : 2,
        licencia_conductor : this.check_conduccion,
        licencia_uso_armamento : this.check_armamento,
        //rol : '3'
      };
      console.log("entra")
      console.log(info_personal_actualizar)
      console.log("Campos completos: "+this.camposCompletos)
      console.log(info_personal_actualizar.fotoOp)
      
      if(this.camposCompletos){
        console.log("Esta todo completo")
        console.log(info_personal_actualizar)
        this.clienteWAService.actualizar_personalOp(this.personal.numCedula, info_personal_actualizar)
        .subscribe({
          next: (res) => {
            console.log("Se han actualizado los datos")
            this.personal.nombres = res.nombres
            this.personal.apellidos = res.apellidos
            this.personal.sexo = res.sexo
            this.personal.estado = res.estado
            this.personal.profesion = res.profesion
            this.personal.telefono = res.telefono
            this.personal.direccion = res.direccion
            this.personal.sucursal = res.sucursal
  
            this.actualizado = true

            localStorage.setItem('detalles_personal', JSON.stringify(res))
  
          },
          error: (e) => {
            this.actualizado = false
            console.log(e)
          }
        });
      } else{

        this.actualizado = false
        alert("personal no actualizado, complete los datos")

      }
      
      if(this.submitted){
        console.log("Datos guardados")
      } else {
        console.log("Datos no guardados")
      }
    }
  
  
    permitirRegistro(): void{
      console.log("entra a fucnion")
      var botonRegistro = document.querySelector("#botonRegistro") as HTMLInputElement | null;
      /*Caso en el que se deba habilitar el boton */
      if(!this.registerForm ){
        if(botonRegistro != undefined){
          console.log("se ha habilitado el boton")
          botonRegistro.disabled = false;
        }
      } else{
        if(botonRegistro != undefined){
          console.log("boton deshabilitado")
          console.log(this.registerForm)
          botonRegistro.disabled = false;
        }
      }
    }
  
     /*validar si fecha escogida indica si usuario es mayor de edad */
    validacionFecha(control: any){
  
      console.log(control)
      if(control){
        const date = moment(control).format('DD-MM-YYYY')
        //console.log("Fecha introducida: " + date)
        //this.user.fechaNac=date.replace("-","/").toString()
        const diaEscogido: number = parseInt(date.split('-')[0])
        const mesEscogido: number = parseInt(date.split('-')[1])
        const anioEscogido: number = parseInt(date.split('-')[2])
        const today = moment().format('DD-MM-YYYY')
        //console.log("Fecha de hoy: " + today)
        const diaActual: number = parseInt(today.split('-')[0])
        const mesActual: number = parseInt(today.split('-')[1])
        const anioActual: number = parseInt(today.split('-')[2])
        const restaAnio = anioActual - anioEscogido
        const restaMes = mesActual - mesEscogido
        const restaDia = diaActual - diaEscogido
        if(restaAnio > 18){
          console.log("Es mayor de edad")
          this.esMayorEdad=true
          //console.log("conf",this.esMayorEdad)
          return null
        }
        if ((restaAnio == 18) && (restaMes >= 0) && (restaDia >= 0)){
          //console.log("Es mayor de edad")
          this.esMayorEdad=true
          //console.log("conf",this.esMayorEdad)
  
          return null/*{ 'validDate': true}*/
        }
        this.esMayorEdad=false
      }
      this.esMayorEdad=false
      //console.log("conf",this.esMayorEdad)
  
      let mensajeError = "Debe ser mayor de edad"
      //console.log("No es mayor de edad")
      //this.esMayorEdad=false
      return mensajeError/*{'validDate': false};*/
    }

    //Obtener sucursales desde un request
    obtener_Sucursales_Request(): void{
      this.clienteWAService.obtener_Sucursales()
      .subscribe({
        next: (data) => {
          this.lista_Sucursales = data;
          console.log(data);
          for(let obj of data){
            if(this.personal.sucursal == obj.idSucursal){
              console.log("La sucursal predeterminada del usuario es: " + obj.idSucursal)
              this.sucursal_De_Personal = obj.idSucursal
            }
          }
        },
        error: (e) => console.error(e)
      });
    }
  
    //Encontrar sucursal seleccionada de la lista de sucursales
    encontrar_Sucursal(direccion_seleccionada: any){
      let info_Sucursal
      this.lista_Sucursales?.forEach( (sucursal) => {
        if(sucursal.direccion == direccion_seleccionada){
          info_Sucursal = sucursal
        }
      })
      return info_Sucursal
    }
  
  
    //Hacer funcion para obtener los checkbox seleccionados de licencias
    cambio_check_conduccion(event: any){
      if(event.target.checked == true){
        this.check_conduccion = true
      } else{
        this.check_conduccion = false
      }
      console.log("Se ha cambiado el check a: " + event.target.checked)
    }

    cambio_check_armamento(event: any){
      if(event.target.checked == true){
        this.check_armamento = true;
      } else{
        this.check_armamento = false
      }
      console.log("Se ha cambiado el check a: " + event.target.checked)
    }
    
  
    cuentaCreada(exito: boolean){
      let element = document.getElementById("mensajeDeConfirmacion");
      //let hidden = element?.getAttribute("hidden");
  
      if(exito){
        element?.setAttribute("mensajeDeConfirmacion", "hidden")
        let elemento_Dos = document.getElementById("mensajeDeConfirmacionDos") 
        if(elemento_Dos?.innerHTML != undefined){
          elemento_Dos!.innerHTML = "La cuenta se ha creado exitosamente"
        }
      }else{
        let elemento_Dos = document.getElementById("mensajeDeConfirmacionDos") 
        if(elemento_Dos?.innerHTML != undefined){
          elemento_Dos!.innerHTML = "La cuenta no se ha creado"
        }
      }
    }
  
    padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }
  
    formatDate(date: Date) {
      return (
        [
          date.getFullYear(),
          this.padTo2Digits(date.getMonth() + 1),
          this.padTo2Digits(date.getDate() + 1),
        ].join('-')
      );
    }
  
    //
    setImagen(event: any){
      /*this.user.fotoOp = event.target.files[0];
      this.registerForm.get('fotoOp')?.setValue(this.user.fotoOp);*/
    }  

    check_valores_estandar(conductor: Boolean, armamento: Boolean){
      if(conductor){
        this.check_conduccion = true
      }
      if(armamento){
        this.check_armamento = true
      }
    }

    //Metodo para habilitar el modo de edicion
  editar_Personal(){
    this.editable = !this.editable
    this.registerForm.enable()

    console.log("se puede editar?")
    console.log(this.editable)
    console.log("El registro esta:")
    console.log(!this.registerForm.valid)

    //this.check_valores_estandar(this.check_conduccion, this.check_armamento)

  }

  //Metodo de eliminacion de personal
  eliminar_personal(): void{
    this.clienteWAService.eliminar_personaOp(this.personal.numCedula)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.registerForm.reset()
        this.eliminado = true
        this.inexistente = true
        localStorage.removeItem('detalles_personal')
      }
    })
  }

  //Metodo para cancelar edicion de personal
  refrescar(){
    window.location.reload()
  }

}
