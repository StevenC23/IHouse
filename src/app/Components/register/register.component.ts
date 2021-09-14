import { Usuario } from './../../Model/usuario';
import { UsuarioService } from './../../ServicesBackend/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../Model/user';
import { UserService } from '../../Services/User/user.service';
import { AuthService } from '../../Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  public user: User;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private usuarioService: UsuarioService,
  ) {
    this.registerForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      passwordd: ['', Validators.required],
    });
  }

  btnRegister(values): void {
    if (this.registerForm.valid) {
      
      if(values.password == values.passwordd){

        let usuario: Usuario = new Usuario();

        usuario.nombre = values.name;
        usuario.codigo = values.email;
        usuario.direccion = "NR";
        usuario.tiusId_TipoUsuario = 2;

            this.authService
              .createUser(values.email, values.password)
              .then(() => {

                this.usuarioService.crearUsuario(usuario).subscribe(d=>{
                  if(d){
                    
                    Swal.fire("Usuario creado con exito");
                    this.router.navigate(['/login']);

                    }
                  })
              })
              .catch((err) => {
                if(err.message == "The email address is already in use by another account."){
                  Swal.fire("Ya existe una cuenta registrada con el email "+values.email);
                }
              });

      }else{
        Swal.fire("La contraseña no coincide");
      }
      
    }
  }

  ngOnInit(): void {
    const user = {} as User;
    this.user = user;
  }
}
