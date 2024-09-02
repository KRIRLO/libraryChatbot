import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SwalAlertsService {

  constructor() { }


  erorrAlert(title: string, descripcion: string ) {
    console.log(title,descripcion);
    return Swal.fire({
      title: title,
      text: descripcion,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#008F97',
    });
  }
  messageAlert(descripcion: string ) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: descripcion,
      showConfirmButton: false,
      timer: 2500
    });
  }

  messageAlertOffTranslate(descripcion: string ) {
    console.log(descripcion);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: descripcion,
      showConfirmButton: false,
      timer: 2500
    });
  }

  yesOrNo() {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text:'You won\'+t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('yes or no' + 1)
        return 1;
      }else{
        return 0;
      }
    })
  }
  messageWhitTimerError(mensaje: string) {
    const Toast = Swal.mixin({
      toast: true,
      // background: "lightgrey",
      position: 'top-right', // Cambia la posición a 'top-start'
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,

      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'error',
      title:  mensaje,
      customClass: {
        popup: 'my-16'
      }
    });
  }

  messageWhitTimerStart(mensaje: string) {
    const Toast = Swal.mixin({
      toast: true,
      // background: "lightgrey",
      position: 'top-start', // Cambia la posición a 'top-start'
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,

      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'success',
      title: mensaje,
      customClass: {
        popup: 'my-16'
      }
    });
  }

  closeToastOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const insideToast = target.closest('.swal2-popup');
    if (!insideToast) {
      Swal.close();
    }
  }








}

