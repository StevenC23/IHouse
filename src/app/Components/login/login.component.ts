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

  dialogo(){
    let msg;


    Swal.fire({
      title: 'Correo',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      preConfirm: (correo) => {
        console.log(correo);
        this.usuarioService.actualizarEnviarContraseña(correo).subscribe(d=>{
          console.log(d);
          
          if(d){
            console.log(d);
            Swal.fire({
              title: "Contraseña enviada al correo"
            })
          }
        }, error => {
          msg = error.error.error[0];
          console.log(msg);
          if(msg){
            Swal.fire({
              title: msg
            })
          }
        })
        
      },
      // allowOutsideClick: () => !Swal.isLoading()
      
    }).then((result) => {
      console.log(result);

    })










    // const hola :{ value: password } = 

    // const { value : password} = Swal.fire({
    //   title: 'Enter your password',
    //   input: 'password',
    //   inputLabel: 'Password',
    //   inputPlaceholder: 'Enter your password',
    // })

    // const { value: password } = await Swal.fire({
    //   title: 'Enter your password',
    //   input: 'password',
    //   inputLabel: 'Password',
    //   inputPlaceholder: 'Enter your password',

    // })
    
    // console.log(password);
    
    // if (password) {
    //   Swal.fire(`Entered password: ${password}`)
    // }




    // Swal.fire({
    //   title: 'Submit your Github username',
    //   input: 'text',
    //   inputAttributes: {
    //     autocapitalize: 'off'
    //   },
    //   showCancelButton: true,
    //   confirmButtonText: 'Look up',
    //   showLoaderOnConfirm: true,
    //   preConfirm: (login) => {
    //     return fetch(`//api.github.com/users/${login}`)
    //       .then(response => {
    //         if (!response.ok) {
    //           throw new Error(response.statusText)
    //         }
    //         return response.json()
    //       })
    //       .catch(error => {
    //         Swal.showValidationMessage(
    //           `Request failed: ${error}`
    //         )
    //       })
    //   },
    //   allowOutsideClick: () => !Swal.isLoading()
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire({
    //       title: `${result.value.login}'s avatar`,
    //       imageUrl: result.value.avatar_url
    //     })
    //   }
    // })


  }
}
