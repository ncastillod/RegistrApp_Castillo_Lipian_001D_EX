import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  users$: Observable<any[]>;

  usuario: firebase.default.User | null;

  firstUser: any | null;

  editedPersonalEmail: string | null = null;

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private menuController: MenuController, 
    private firestore: AngularFirestore) { 
      this.users$ = this.firestore.collection('users').valueChanges();
    }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      this.usuario = user;

      this.users$.subscribe((users) => {
        this.firstUser = users.length > 0 ? users[0] : null;
      });
    });
  }

  async editarPersonalEmail() {
    try {
      const newPersonalEmail = prompt('Editar Correo Personal', this.firstUser?.personalEmail || '');
  
      if (newPersonalEmail !== null && newPersonalEmail !== undefined) {
        // Actualizar el valor localmente
        this.editedPersonalEmail = newPersonalEmail;
  
        // Obtener el ID del usuario
        const userId = this.firstUser?.userId || this.usuario?.uid;
  
        if (userId) {
          console.log('Actualizando el correo personal en Firebase...');
          
          // Utilizar set si el documento no existe, o update si ya existe
          await this.firestore.collection('users').doc(userId).set({ personalEmail: newPersonalEmail }, { merge: true });
  
          console.log('Correo personal actualizado con éxito.');
        } else {
          console.error('No se encontró el userId del primer usuario ni del usuario autenticado.');
        }
      }
    } catch (error) {
      console.error('Error al actualizar el correo personal:', error);
    }
  }
  

  verDetalle(users: any) {
    console.log('Detalle del usuario:', users);
  }

  mostrarMenu() {
    this.menuController.open('first');
  }

  cerrarSesion() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/inicio']);
    });
  }



}
