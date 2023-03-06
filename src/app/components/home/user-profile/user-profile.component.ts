import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

import Swal from'sweetalert2';
//import 'sweetalert2/src/sweetalert2.scss'


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userRetrieve : User | any;
  messageNotification : string =  "";
  clasesNotification : string = "";

  constructor (private userServices: UsersService,
               private activatedRoute: ActivatedRoute,
               private router: Router) 
  {

  }

   ngOnInit() {
      this.activatedRoute.params.subscribe( async (params: any) : Promise<void> => {
        try {
          let id= params.id;
          let response = await this.userServices.getById(id);
          this.userRetrieve = response;
        }
        catch (err) {
          console.log("Error petición ID user")
        }
      })
    }
    
    modalDelete(id: string | undefined) : void {
      Swal.fire({
        title: 'Deseas borrar el usuario ' + this.userRetrieve.username + " ?",
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          //consultar al servicio para hacer el borrado.
          this.deleteUser(id);
        } 
      })
      
    }

    async deleteUser(id: string | undefined): Promise<void> {
      //consultar al servicio para hacer el borrado.
      if (id !== undefined) {
        try {
          let response = await this.userServices.deleteUser(id);
          if (response) {
            Swal.fire(
              'Borrado!',
              'Se a borrado el usuario ' + response.username + ' correctamente.',
              'success'
            )
            this.router.navigate(['/home'])
          }
        } catch (err) {
          console.log(err);
          this.updateNotifications("<p class='mb-0'>" + err + "</p>","p-3 bg-danger");
        }
      }
      
    }

     //Función para los mensajes en las notificaciones
    updateNotifications(msg: string, clase: string) : void {
      this.messageNotification = msg;
      this.clasesNotification = clase;
    }
}
