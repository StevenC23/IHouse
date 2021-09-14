import { Usuario } from './../../Model/usuario';
import { UsuarioService } from './../../ServicesBackend/usuario.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../Services/auth.service';
import { UserService } from 'src/app/Services/User/user.service';
import { User } from 'src/app/Model/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userlist: User[];

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private usuarioService: UsuarioService,
  ) {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  btnLogin(values): void {
    if (this.loginForm.valid) {
      this.authService
        .login(values.email, values.password)
        .then(() => {

          //busco el usuario que si existe en el backend
          this.usuarioService.consultarUsuariosPorCodigoOrm(values.email).subscribe(d=>{
            if(d){
              
              localStorage.setItem('email', d.codigo);
              if(d.tiusId_TipoUsuario == 1){
                localStorage.setItem('rol', "ADMIN");
              }else{
                localStorage.setItem('rol', "USER");
              }
              localStorage.setItem('name', d.nombre);
              localStorage.setItem('usuaId',d.usuaId);

              if (d.tiusId_TipoUsuario == 1) {
                console.log('Redirecciona a admin');
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/home']);
              }
            }
          })
        })
        .catch(() => {
          Swal.fire("El usuario o la contraseña no son validos");
        });
    }
  }

  ngOnInit(): void {
  }
}
