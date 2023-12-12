import { registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

interface Componente {
  name: string;
  icon: string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  componentes: Componente[] = [
    {
      name: 'Home',
      icon: 'home-outline',
      redirecTo: '/main/home'
    },
    {
      name: 'Perfil',
      icon: 'person-outline',
      redirecTo: '/perfil'
    },
    {
      name: 'Sobre la App',
      icon: 'cafe-outline',
      redirecTo: '/card'
    },
    {
      name: 'Iniciar Sesion',
      icon: 'person-outline',
      redirecTo: '/auth'
    },
    {
      name: 'Registrate',
      icon: 'attach-outline',
      redirecTo: '/auth/login'
    },


  ]


  metodo() {
    if (localStorage.getItem("ingresado") && localStorage.getItem("esDocente") == 'false') {
      return this.componentes.filter(c => {
        return !(c.name == "Registrate" || c.name == "Iniciar Sesion" || c.name == "Generar QR")
      });
    } if (localStorage.getItem("ingresado") && localStorage.getItem("esDocente")) {
      return this.componentes.filter(c => {
        return !(c.name == "Registrate" || c.name == "Iniciar Sesion")
      });
    } else {
      return this.componentes.filter(c => {
        return !(c.name == "Generar QR")
      });
    }
  }






  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  onClick() {
    this.router.navigate(['inicio'])
    localStorage.clear()
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/auth']); // Redirige a la página de inicio de sesión después del cierre de sesión
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }
}
