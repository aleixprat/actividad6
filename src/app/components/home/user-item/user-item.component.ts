import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent {
  @Input() userRetrieve : User | any;

  constructor(private userServices : UsersService) {

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
        }
      } catch (err) {
        console.log(err);
      }
    }
    
  }
}
