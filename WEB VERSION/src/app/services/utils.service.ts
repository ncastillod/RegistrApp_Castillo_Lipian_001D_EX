import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);

  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  saveInLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string): any {
    const item = localStorage.getItem(key);

    // Verificar si el valor es null antes de intentar parsearlo
    if (item === null) {
      // Puedes decidir cómo manejar este caso. Devolver null, lanzar un error, etc.
      console.warn(`El valor para la clave '${key}' en localStorage es null.`);
      return null;
    }

    return JSON.parse(item);
  }
}
