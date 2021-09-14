import Swal from 'sweetalert2';
import { TipoArtefactoService } from './../../ServicesBackend/tipo-artefacto.service';
import { ArtefactoService } from './../../ServicesBackend/artefacto.service';
import { Artefacto } from './../../Model/artefacto';
import { UsuarioService } from './../../ServicesBackend/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Device } from 'src/app/Model/device';
import { User } from 'src/app/Model/user';
import { DeviceService } from 'src/app/Services/Device/device.service';
import { UserService } from 'src/app/Services/User/user.service';
import { Usuario } from 'src/app/Model/usuario';

@Component({
  selector: 'app-devices-assign',
  templateUrl: './devices-assign.component.html',
  styleUrls: ['./devices-assign.component.css'],
})
export class DevicesAssignComponent implements OnInit {
  users: User[];
  devices: Device[];

  usuarios: Usuario[];
  artefactos: Artefacto[];
  
  public subFindUsers: Subscription;
  public subFindDevices: Subscription;
  assignDeviceForm: FormGroup;

  constructor(
    private userService: UserService,
    private deviceService: DeviceService,
    private builder: FormBuilder,
    private usuarioService: UsuarioService,
    private tipoArtefactoService: TipoArtefactoService,
    private artefactoService: ArtefactoService,
  ) {}

  ngOnInit(): void {
    // this.subFindUsers = this.userService.findUsers().subscribe((data) => {
    //   this.users = data;
    // });
    let usuario: Usuario = new Usuario();
    this.subFindUsers = this.usuarioService.consultarUsuarios(usuario).subscribe(d=>{
      if(d){
        this.usuarios = d;
      }
    })

    this.subFindDevices = this.tipoArtefactoService.consultarTipoArtefactosActivos().subscribe(d=>{
      if(d){
        this.artefactos = d;
      }
    })

    this.assignDeviceForm = this.builder.group({
      device: ['', Validators.required],
      usuario: ['', Validators.required],
      url: ['', Validators.required],
      codigo: ['',Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.subFindUsers.unsubscribe();
    this.subFindDevices.unsubscribe();
  }

  btnAssignDevice(values) {

  let artefacto: Artefacto = new Artefacto();
  
  artefacto.codigoUsuario = values.usuario;
  artefacto.tiarId_TipoArtefacto = values.device;
  artefacto.url= values.url;
  artefacto.codigo = values.codigo;

  this.usuarioService.consultarUsuariosPorCodigoOrm(values.usuario).subscribe(d=>{
    if(d){
      
      artefacto.usuaId_Usuario = d.usuaId;

      this.artefactoService.crearArtefacto(artefacto).subscribe(d=>{
        if(d){
          this.assignDeviceForm.reset();
          Swal.fire("El artefacto ha sido asignado correctamente");
        }
      })
    }
  })

  

  

  }
  
  

  // this.artefactoService.crearArtefacto().subscribe

}
