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
      password: ['', [Validators.required,Validators.minLength(6)]],
    });
  }

  btnLogin(values): void {
    
    if (this.loginForm.valid) {

      let usuario: Usuario = new Usuario();
      usuario.codigo = values.email;
      usuario.pss = values.password;

      console.log(usuario);
      
      this.usuarioService.validarUsuarioYContraseñaCorrecta(usuario).subscribe(data=>{
        if(data){

          // busco el usuario que si existe en el backend
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
          }, error => {
            let mensaje = error.error.error[0];
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: mensaje
            });
          })

        }
        else{
          Swal.fire("El usuario o contraseña son incorrectos");
        }
        
      }, error => {
        let mensaje = error.error.error[0];
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: mensaje
        });
      })

      
    }
  }

  ngOnInit(): void {
  }
}
