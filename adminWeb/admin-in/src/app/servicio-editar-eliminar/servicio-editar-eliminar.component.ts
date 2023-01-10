import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective} from '@angular/forms';
import { ServiceModel } from '../models/servicio';
import { TiposServiciosModel } from '../models/tipoServicio.model';
import { ClienteWAService } from '../services/cliente-wa.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-servicio-editar-eliminar',
  templateUrl: './servicio-editar-eliminar.component.html',
  styleUrls: ['./servicio-editar-eliminar.component.css']
})
export class ServicioEditarEliminarComponent implements OnInit {

  //Mensaje de error
  mensajeError = "";
  mensajeErrorCorreo = "";
  editable:boolean=false
  actualizado!:boolean | null

  //Variable que confirma eliminacion del servicio
  eliminado!:boolean | null

  //Variable para indicar que no existe servicio a editar y muestra boton de regresar a pagina principal
  inexistente!: boolean | null

  registerForm!: FormGroup;

  servicio: ServiceModel = new ServiceModel();

  //Variable para el modal
  display = 'none';

  //Variable de fecha de creacion
  fecha_Creacion_Servicio = new Date();

  //Diccionario inventario requerido seleccionado
  inventario_Requerido = new Map();

  //Diccionario tipo de personal requerido
  tipo_Personal_Requerido = new Map();

  //Cedula a usar para encontrar id del admin
  cedula_Admin = 0

  //Variables de campos completados del registro y de confirmacion de que se han aceptado los términos y condiciones
  camposCompletos: boolean = false;

  //Lista de tipos de servicios a presentar
  lista_Tipos_Servicios?: TiposServiciosModel[];
  
  id_Tipo_Servicio_Seleccionado = 0

  //Indicador si registro fue guardado en la base de datos o no
  submitted = false;

  //Bandera creada para indicar que la cuenta fue creada y así cambiar el mensaje de retroalimentacion
  exito = false;

  //Variable para setear checks por default para inventario
  check_vehiculo = false
  check_armamento = false
  check_candado = false

  //Variable para setear checks por default para tipo personal
  check_guardia = false
  check_guardaespaldas = false
  check_conductor_chofer = false

  //Variable que se usara para presentar los datos del servicio
  servicio_actualizar: ServiceModel = {
    idServicio: 0,
    nombreServicio: '',
    costo: 0,
    detalles: '',
    fecha_Creacion: new Date(),
    tipo_Servicio: 0,
    administrador_Creador: 0,
    icono: new URL("https://cdn-icons-png.flaticon.com/512/263/263100.png")
  }

  constructor(
    private formBuilder: FormBuilder, 
    private clienteWAService: ClienteWAService,
    private router: Router
  ) { }

  ngOnInit(): void {

    //this.obtener_info_servicio()
    let lista_inventario: string[] = [];
    let lista_tipo_personal: string[] = [];

    console.log("esta tontera es: " + localStorage.getItem("nombre_servicio_editar"))
    
    //if(localStorage.getItem("detalles_servicio")){
      const info_servicio = JSON.parse(localStorage.getItem("detalles_servicio")!)
      this.servicio.nombreServicio = info_servicio.nombreServicio!.replaceAll('_', ' ')
      this.servicio.nombreServicio = info_servicio.nombreServicio!.replaceAll('_', ' ')
      this.servicio.costo = info_servicio.costo
      this.servicio.detalles = info_servicio.detalles
      this.servicio.fecha_Creacion = info_servicio.fecha_Creacion
      this.servicio.tipo_Servicio = info_servicio.tipo_Servicio
      this.servicio.administrador_Creador = info_servicio.administrador_Creador
      this.servicio.icono = info_servicio.icono

    //}
    console.log("dato despues del get del localS")
    console.log(this.servicio.nombreServicio)


    //console.log(this.servicio.detalles)
    let lista_reporte: [string[]] = [[]]
    if(this.servicio.detalles){
      lista_reporte = this.parsear_detalles(this.servicio.detalles.toString())
    }
    //console.log(lista_reporte)
    lista_inventario = lista_reporte.at(1)!
    //console.log(lista_inventario)
    lista_tipo_personal = lista_reporte.at(2)!
    //console.log(lista_tipo_personal)

    this.check_valores_estandar(lista_inventario, lista_tipo_personal);
    console.log("Esta " + this.check_vehiculo)

    console.log("Los datos a poner en el form son:")
    console.log(this.servicio)
    
    this.registerForm = this.formBuilder.group({
      'nombreServicio': {value:[this.servicio.nombreServicio, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]], disabled:!this.editable}, 
      'costo': {value:[this.servicio.costo, [Validators.required, Validators.pattern('^[0-9]*\.[0-9]*$')]], disabled:!this.editable},
      //'detalles': [this.servicio.detalles, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      'tipo_Servicio': {value:[this.servicio.tipo_Servicio, [Validators.required]], disabled:!this.editable},
      //'icono' : ['']
    });
    
    this.inventario_Requerido.set('vehiculo', this.check_vehiculo);
    this.inventario_Requerido.set('armamento', this.check_armamento);
    this.inventario_Requerido.set('candado_satelital', this.check_candado);

    this.tipo_Personal_Requerido.set('guardia', this.check_guardia)
    this.tipo_Personal_Requerido.set('guardaespaldas', this.check_guardaespaldas)
    this.tipo_Personal_Requerido.set('conductor_chofer', this.check_conductor_chofer)

    console.log(this.inventario_Requerido)
    console.log(this.tipo_Personal_Requerido)


    this.obtener_Tipo_Servicios_Request()


  }

  //Metodo para actualizar servicio
  actualizar_Servicio(){
    console.log("Checkboxes que estan seleccionadas")
    console.log("vehi: " + this.check_vehiculo + "\n"
                + "armamento: " + this.check_armamento + "\n"
                + "candado: " + this.check_candado + "\n"
                + "guardia: " + this.check_guardia + "\n"
                + "guardaespaldas: " + this.check_guardaespaldas + "\n"
                + "conductor/chofer: " + this.check_conductor_chofer + "\n"
    )

    var checkbox_vehiculo = document.getElementById("flexRadioDefault1") as HTMLInputElement;
    console.log("esta checkeado: " + checkbox_vehiculo.checked)

    this.validar_inventario_requerido(this.inventario_Requerido);
    console.log("Inventario luego de validar los checks")
    console.log(this.inventario_Requerido)
    this.validar_tipo_personal_requerido(this.tipo_Personal_Requerido)
    let reporte_inventario = this.convertir_reporte_inventario(this.inventario_Requerido)
    console.log("reporte inventtttt")
    console.log(reporte_inventario)
    let reporte_tipo_personal = this.convertir_reporte_tipo_personal(this.tipo_Personal_Requerido)
    let reporte = reporte_inventario + '. ' + reporte_tipo_personal
    this.guardar()
    this.camposCompletos = !this.registerForm.invalid
    const info_servicio_actualizar = {
      nombreServicio: this.servicio.nombreServicio.replaceAll(' ', '_'),
      costo: this.servicio.costo,
      tipo_Servicio: this.servicio.tipo_Servicio,
      detalles: reporte,
      fecha_Creacion: this.fecha_Creacion_Servicio,
      administrador_Creador: this.servicio.administrador_Creador,
      icono: new URL("https://cdn-icons-png.flaticon.com/512/263/263100.png")
    }
    if(this.camposCompletos){
      console.log("Informacion del servicio para actualizar")
      console.log(info_servicio_actualizar)
      this.clienteWAService.actualizar_servicio(JSON.parse(localStorage.getItem("detalles_servicio")!).nombreServicio, info_servicio_actualizar)
      .subscribe({
        next: (res) => {
          console.log("Se han guardado los datos")
          this.servicio.nombreServicio = res.nombreServicio
          this.servicio.costo = res.costo
          this.servicio.tipo_Servicio = res.tipo_Servicio
          this.servicio.detalles = reporte
          this.actualizado = true

          localStorage.setItem('detalles_servicio', JSON.stringify(res))

        },
        error: (e) => {
          this.actualizado = false
          console.log(e)
        }
      });
    } else{
      this.actualizado = false
      alert("Servicio no actualizado")
    }
  }


  //Metodo para habilitar el modo de edicion
  editar_Servicio(){
    this.editable = !this.editable
    this.registerForm.enable()

    console.log(this.check_vehiculo)
    console.log(this.check_armamento)
    console.log(this.check_candado)
    console.log(this.check_guardia)
    console.log(this.check_guardaespaldas)
    console.log(this.check_conductor_chofer)

    console.log("se puede editar?")
    console.log(this.editable)
    console.log("El registro esta:")
    console.log(!this.registerForm.valid)


    let lista_inventario: string[] = [];
    let lista_tipo_personal: string[] = [];
    let detalles_reporte = this.parsear_detalles(JSON.parse(localStorage.getItem("detalles_servicio")!).detalles.toString())
    lista_inventario = detalles_reporte.at(1)!
    lista_tipo_personal = detalles_reporte.at(2)!
    console.log(lista_inventario)
    this.check_valores_estandar(lista_inventario, lista_tipo_personal);



  }

  //Metodo para actualizar la informacion del servicio
  guardar(){
    this.editable = false
    this.registerForm.disable()
  }


  eliminar_Servicio(){
    this.eliminado = true
    let x = document.getElementById('btnEliminarConfirmacion') as HTMLInputElement;
    x.hidden = true
    this.clienteWAService.eliminar_servicio(this.servicio.nombreServicio)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.registerForm.reset()
        this.inexistente = true
        localStorage.removeItem('nombre_servicio_editar')
        localStorage.removeItem('detalles_servicio')
        //this.router.navigate(['/serviciosVentana'])
      }
    });
  }

  //Obtener informacion sobre el servicio que se quiere actualizar
  obtener_info_servicio(){
    this.clienteWAService.seleccionar_servicio(localStorage.getItem('nombre_servicio_editar')?.toString()!)
    .subscribe({
      next: (data) => {
        console.log(data)
        this.servicio_actualizar.nombreServicio = data.nombreServicio
        this.servicio_actualizar.costo = data.costo
        this.servicio_actualizar.administrador_Creador = Number(JSON.parse(localStorage.getItem("detalles_servicio")!).administrador_Creador)
        this.servicio_actualizar.fecha_Creacion = data.fecha_Creacion
        this.servicio_actualizar.tipo_Servicio = data.tipo_Servicio
        this.servicio_actualizar.icono = data.icono
      },
      error: (e) => console.log(e)
    })
  }

  //-------------------------------------------------------- Change de checks ----------------------------------------------
  cambio_check_vehiculo(event: any){
    console.log("Se ha cambiado el check a: " + event.target.checked)
    if(event.target.checked == true){
      this.check_vehiculo = true
    } else{
      this.check_vehiculo = false
    }
  } 

  cambio_check_armamento(event: any){
    console.log("Se ha cambiado el check a: " + event.target.checked)

    if(event.target.checked == true){
      this.check_armamento = true
    } else{
      this.check_armamento = false
    }
  }

  cambio_check_candado(event: any){
    if(event.target.checked == true){
      this.check_candado = true
    } else{
      this.check_candado = false
    }
    console.log("Se ha cambiado el check a: " + event.target.checked)
  }

  cambio_check_guardia(event: any){
    if(event.target.checked == true){
      this.check_guardia = true
    } else{
      this.check_guardia = false
    }
    console.log("Se ha cambiado el check a: " + event.target.checked)
  }

  cambio_check_guardaespaldas(event: any){
    if(event.target.checked == true){
      this.check_guardaespaldas = true
    } else{
      this.check_guardaespaldas = false
    }
    console.log("Se ha cambiado el check a: " + event.target.checked)
  }

  cambio_check_conductor_chofer(event: any){
    if(event.target.checked == true){
      this.check_conductor_chofer = true
    } else{
      this.check_conductor_chofer = false
    }
    console.log("Se ha cambiado el check a: " + event.target.checked)
  }

  //----------------------------------------------------------------------------------------------------------------------


  //Metodo para verificar el inventario requerido seleccionado
  validar_inventario_requerido(diccionario_inventario: Map<string, boolean>){
    var checkbox_vehiculo = document.getElementById("flexRadioDefault1") as HTMLInputElement;
    var checkbox_armamento = document.getElementById("flexRadioDefault2") as HTMLInputElement;
    var checkbox_candado = document.getElementById("flexRadioDefault3") as HTMLInputElement;

    console.log("entra a las validacionessss:")
    console.log("Inventario antes de la validacion")
    console.log(diccionario_inventario)

    /*for(let [key, value] of diccionario_inventario){
      if(key == "vehiculo" && value == true){
        this.check_vehiculo = true
        checkbox_vehiculo.checked = true
        console.log("vehiculo seleccionado")
      }
      if(key == "armamento" && value == true){
        this.check_armamento = true
      }
      if(key == "candado_satelital" && value == true){
        this.check_candado = true
      }
    }*/

    if(this.check_vehiculo == true){
      diccionario_inventario.set('vehiculo', true);
    }

    if(this.check_vehiculo == false){
      diccionario_inventario.set('vehiculo', false);
    }

    if(this.check_armamento == true){
      diccionario_inventario.set('armamento', true);
    }

    if(this.check_armamento == false){
      diccionario_inventario.set('armamento', false);
    }

    if(this.check_candado == true){
      diccionario_inventario.set('candado_satelital', true)
    }

    if(this.check_candado == false){
      diccionario_inventario.set('candado_satelital', false)
    }

  }

  //Metodo para reporte de inventario
  convertir_reporte_inventario(diccionario_inventario: Map<string, boolean>){
    console.log("entra a funcion de convertir a reporte")
    console.log(diccionario_inventario)
    var reporte_detalles: string = "Inventario requerido" + " => "
    for(let [key, value] of diccionario_inventario){
      console.log(key + " " + value)
      if(value == true){
        reporte_detalles += key + " | "
      }
    }
    console.log(reporte_detalles)
    return reporte_detalles
  }


  //Metodo para verificar el tipo de personal requerido
  validar_tipo_personal_requerido(diccionario_tipo_personal: Map<string, boolean>){
    var checkbox_guardia = document.getElementById("check_Guardia") as HTMLInputElement | null;
    var checkbox_guardaespaldas = document.getElementById("check_Guardaespaldas") as HTMLInputElement | null;
    var checkbox_chofer_conductor = document.getElementById("check_Conductor_Chofer") as HTMLInputElement | null;

    /*for(let [key, value] of diccionario_tipo_personal){
      if(key == "guardia" && value == true){
        this.check_guardia = true
      }
      if(key == "guardaespaldas" && value == true){
        this.check_guardaespaldas = true
      }
      if(key == "conductor_chofer" && value == true){
        this.check_conductor_chofer = true
      }
    }*/

    if(this.check_guardia == true){
      diccionario_tipo_personal.set('guardia', true);
    }

    if(this.check_guardia == false){
      diccionario_tipo_personal.set('guardia', false);
    }

    if(this.check_guardaespaldas == true){
      diccionario_tipo_personal.set('guardaespaldas', true);
    }

    if(this.check_guardaespaldas == false){
      diccionario_tipo_personal.set('guardaespaldas', false);
    }

    if(this.check_conductor_chofer == true){
      diccionario_tipo_personal.set('conductor_chofer', true)
    }

    if(this.check_conductor_chofer == false){
      diccionario_tipo_personal.set('conductor_chofer', false)
    }

  }

  //Metodo para reporte de tipo de personal
  convertir_reporte_tipo_personal(diccionario_tipo_personal: Map<string, boolean>){
    console.log(diccionario_tipo_personal)
    var reporte_detalles: string = "Tipo de personal requerido" + " => "
    for(let [key, value] of diccionario_tipo_personal){
      console.log(key + " " + value)
      if(value == true){
        reporte_detalles += key + " | "
      }
    }
    console.log(reporte_detalles)
    return reporte_detalles
  }

  //Funcion para guardar los tipos de servicios
  obtener_Tipo_Servicios_Request(): void{
    this.clienteWAService.obtener_Tipos_Servicios()
    .subscribe({
      next: (data) => {
        this.lista_Tipos_Servicios = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  cuentaCreada(exito: boolean){
    let element = document.getElementById("mensajeDeConfirmacion");
    //let hidden = element?.getAttribute("hidden");

    if(exito){
      element?.setAttribute("mensajeDeConfirmacion", "hidden")
      let elemento_Dos = document.getElementById("mensajeDeConfirmacionDos") 
      if(elemento_Dos?.innerHTML != undefined){
        elemento_Dos!.innerHTML = "El servicio se ha creado exitosamente"
      }
    }else{
      let elemento_Dos = document.getElementById("mensajeDeConfirmacionDos") 
      if(elemento_Dos?.innerHTML != undefined){
        elemento_Dos!.innerHTML = "La cuenta no se ha creado"
      }
    }
  }

  parsear_detalles(reporte: string){
    let lista_general: [string[]] = [[]];
    let lista_inventario: string[] = [];
    let lista_tipo_personal: string[] = [];

    let separacion_requerimientos = reporte.split('.')

    let inventario_requerido = separacion_requerimientos[0]
    let valor_inventario = inventario_requerido.split("=>")[1]
    valor_inventario.split('|').forEach(function(obj_inventario){
      lista_inventario.push(obj_inventario.replaceAll(' ', ''))
    });

    let tipo_personal_requerido = separacion_requerimientos[1]
    let valor_tipo_personal = tipo_personal_requerido.split("=>")[1]
    valor_tipo_personal.split('|').forEach(function(obj_tipo_personal){
      lista_tipo_personal.push(obj_tipo_personal.replaceAll(' ', ''))
    })

    lista_general.push(lista_inventario)
    lista_general.push(lista_tipo_personal)


    console.log(lista_inventario);
    console.log(lista_tipo_personal);
    console.log("A".toLowerCase())

    return lista_general


  }

  //Metodo para agregar checked a aquellos campos de inventario y tipo de personal que esten seleccionados 
  check_valores_estandar(lista_inv: string[], lista_tpersonal: string[]){
    
    if(lista_inv){
      for(let i=0; i < lista_inv.length; i++){
        if(lista_inv[i] == "vehiculo"){
          this.check_vehiculo = true
        }
        if(lista_inv[i] == "armamento"){
          this.check_armamento = true
        }
        if(lista_inv[i] == "candado_satelital"){
          this.check_candado = true
        }
      }
    }
    
    if(lista_tpersonal){
      for(let i=0; i < lista_tpersonal.length; i++){
        if(lista_tpersonal[i] == "guardia"){
          this.check_guardia = true
        }
        if(lista_tpersonal[i] == "guardaespaldas"){
          this.check_guardaespaldas = true
        }
        if(lista_tpersonal[i] == "chofer/conductor"){
          this.check_conductor_chofer = true
        }
      }
    }

    
  }

  //Metodo para cancelar edicion de servicio
  refrescar(){
    window.location.reload()
  }

  volver_principal(){
    //this.router.navigate(['/serviciosVentana'])
  }

}
