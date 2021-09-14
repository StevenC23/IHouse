import Swal from 'sweetalert2';
import { Artefacto } from './../../Model/artefacto';
import { ArtefactoService } from './../../ServicesBackend/artefacto.service';
import { UsuarioService } from './../../ServicesBackend/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../Model/user';
import { UserService } from 'src/app/Services/User/user.service';
import { Subscription } from 'rxjs';
import { Device } from 'src/app/Model/device';
import { DeviceService } from 'src/app/Services/Device/device.service';
import { Usuario } from 'src/app/Model/usuario';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  iterator: number;
  userList: Usuario[];
  devicesList: Artefacto[];
  userSearch: User;
  userSearchForm: FormGroup;
  private subFindUsers: Subscription;

  constructor(
    private userService: UserService,
    private builder: FormBuilder,
    private deviceService: DeviceService,
    private usuarioService: UsuarioService,
    private artefactoService: ArtefactoService,
  ) {
    
  }

  ngOnInit(): void {
    
    this.getData();

    this.userSearchForm = this.builder.group({
      uSearch: ['', Validators.required],
    });
  }

  getData(){

    let usuario: Usuario = new Usuario();
    this.usuarioService.consultarUsuarios(usuario).subscribe(d=>{
      if(d){
        
        this.userList = d;
      }
    })
  }

  ngOnDestroy(): void {}

  userSearchM(values): void {
    
    this.artefactoService.consultarArtefactosPorUsuario(parseInt(values.uSearch, 10)).subscribe(d=>{
      if(d){
        this.devicesList = d;
      }
    })
  }

  borrar(device): void {
    
    let artefacto: Artefacto = new Artefacto();
    artefacto.arteId = device.arteId;
    
    this.artefactoService.eliminarArtefacto(artefacto).subscribe(d=>{
      if(d){
        Swal.fire("El artefacto ha sido eliminado correctamente");
        this.userSearchM({uSearch:device.usuaId_Usuario});
      }
    })

  }
}
