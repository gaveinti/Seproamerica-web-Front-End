import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlDirective } from '@angular/forms';
import { ServicioseleccionadoService } from '../services/servicioseleccionado.service';
//import { FormularioServicio } from '../models/formularioServicio';
import * as moment from "moment";
import { Router } from '@angular/router';
import { Constantes } from '../util/constantes';
import { Solicitud_Pedido_Model } from '../models/solicitud_pedido';
import { ClienteWAService } from '../services/cliente-wa.service';
import { Cliente_Registro_Model } from '../models/clienteRegistro';



@Component({
  selector: 'app-servicioseleccionado',
  templateUrl: './servicioseleccionado.component.html',
  styleUrls: ['./servicioseleccionado.component.css']
})
export class ServicioseleccionadoComponent implements OnInit {

  //Objeto para solicitud de pedido de servicio
  solicitud_Servicio: Solicitud_Pedido_Model = new Solicitud_Pedido_Model();

  fechaActual = moment().format('DD/MM/YYYY')
  estaEnSErvicioSeleccionado!: boolean;
  usuario: RegisterModel = {
    apellidos: '',
    nombres: '',
    cedula: 0,
    fechaNac: new Date(),
    sexo: '',
    correo: '',
    telefono: 0,
    contrasenia: '',
    rol:'2'
  };

  nombreServicio: string | null = "";

  //servicio: FormularioServicio = new FormularioServicio();
  cliente_registro: Cliente_Registro_Model = new Cliente_Registro_Model();

  //Variables para guardar cedula del cliente que esta en local Storage
  cliente_info = localStorage.getItem("datoUsuario");
  cedula_Cliente_Local_Storage_parse = JSON.parse(this.cliente_info!).cedula.toString();
  

  

  registerForm!: FormGroup;


  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private servicioSeleccionadoService: ServicioseleccionadoService,
    private clienteWAService: ClienteWAService,
    ) { }

  ngOnInit(): void {
    this.servicioSeleccionadoService.estaEnSErvicioSeleccionado=true
    console.log("esta seleccionado?: " + this.servicioSeleccionadoService.estaEnSErvicioSeleccionado)

    this.nombreServicio = this.servicioSeleccionadoService.nombreServicioEscogidoComponente()
    if(localStorage.getItem("servicio") != null){
       this.nombreServicio = localStorage.getItem("servicio")
    }
    const correo = this.authService.obtenerCorreo()
    console.log("Correo de sesion iniciada: " + correo)
    const data = localStorage.getItem("datoUsuario")
    console.log(data)
    this.usuario = this.authService.getUsuario();

    //Valores para la solicitud de pedido de servicio
    this.obtener_id_cliente(this.cedula_Cliente_Local_Storage_parse!);

    let obj = localStorage.getItem("info_Servicio")
    let obj_parse = JSON.parse(obj!)

    this.solicitud_Servicio.idServicio = obj_parse.idServicio;

    this.solicitud_Servicio.administrador_Encargado = obj_parse.administrador_Creador;

    this.solicitud_Servicio.fecha_Solicitud = new Date();

    ///////////////////////////////////////////////////////////////
    this.solicitud_Servicio.cliente_solicitante = 1;
    
    this.solicitud_Servicio.nombreServicio = localStorage.getItem("servicio")!.toString()

    this.solicitud_Servicio.estado = 1;

    this.registerForm = this.formBuilder.group({
      'fechaInicio': [this.solicitud_Servicio.fecha_Inicio],
      'fechaFinalizacion': [this.solicitud_Servicio.fecha_Finalizacion],
      'horaInicio': [this.solicitud_Servicio.hora_Inicio],
      'horaFinalizacion': [this.solicitud_Servicio.hora_Finalizacion],
      'numeroEmpleados': [this.solicitud_Servicio.cantidad_Empleados_Asignados],
    });
    this.solicitud_Servicio.latitud_Origen = Number(localStorage.getItem("latitudInicio"))
    this.solicitud_Servicio.longitud_Origen = Number(localStorage.getItem("longitudInicio"))
    this.solicitud_Servicio.latitud_Destino = Number(localStorage.getItem("latitudDestino"))
    this.solicitud_Servicio.longitud_Destino = Number(localStorage.getItem("longitudDestino"))

    console.log("Cedula es guardada como");
    console.log(this.cedula_Cliente_Local_Storage_parse)


  }

  ngOnDestroy(){
    this.servicioSeleccionadoService.estaEnSErvicioSeleccionado=false
    console.log("salio del componente")
    console.log("esta seleccionado?: " + this.servicioSeleccionadoService.estaEnSErvicioSeleccionado)

  }


  

  imprimirFormularioServicio(){
    console.log(this.solicitud_Servicio)
    const data = {
      nombre_Servicio : this.solicitud_Servicio.nombreServicio,
      fecha_Solicitud : this.solicitud_Servicio.fecha_Solicitud,
      fecha_Finalizacion: this.solicitud_Servicio.fecha_Finalizacion,
      fecha_Inicio: this.solicitud_Servicio.fecha_Inicio,
      hora_Inicio: this.solicitud_Servicio.hora_Inicio,
      hora_Finalizacion: this.solicitud_Servicio.hora_Finalizacion,
      latitud_Origen: this.solicitud_Servicio.latitud_Origen,
      longitud_Origen: this.solicitud_Servicio.longitud_Origen,
      latitud_Destino: this.solicitud_Servicio.latitud_Destino,
      longitud_Destino: this.solicitud_Servicio.longitud_Destino,
      cantidad_Empleados_Asignados: this.solicitud_Servicio.cantidad_Empleados_Asignados,
      estado: this.solicitud_Servicio.estado,
      idServicio: this.solicitud_Servicio.idServicio,
      administrador_Encargado: this.solicitud_Servicio.administrador_Encargado,
      //personal_Encargado: 1,
      cliente_solicitante: this.solicitud_Servicio.cliente_solicitante,
      cantidad_vehiculos: 0,
      costo:0,
      detalle: this.solicitud_Servicio.nombreServicio,
      metodo_Pago: 1
    }
    this.clienteWAService.create_Solicitud_Servicio(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });


  }

  //Función para obtener el id del cliente solicitante
  obtener_id_cliente(cedula_Cliente: string){
    this.clienteWAService.obtener_cliente(cedula_Cliente)
      .subscribe({
        next: (data) => {
          this.solicitud_Servicio.cliente_solicitante = data.idCliente;
        },
        error: (e) => console.error(e)
      });
  }




}
