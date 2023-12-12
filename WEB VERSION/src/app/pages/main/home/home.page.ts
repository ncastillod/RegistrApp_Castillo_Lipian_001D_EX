import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs'; 
import { ModalQrComponent } from '../../../shared/components/modal-qr/modal-qr.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  clases$: Observable<any[]>;
  claseSeleccionada: any; // Variable para almacenar la clase seleccionada

  constructor(
    private firestore: AngularFirestore,
    private modalCtrl: ModalController
  ) {
    this.clases$ = this.firestore.collection('clases').valueChanges();
  }

  ngOnInit() {}

  async generarQR(clase: any) {
    const qrData = JSON.stringify(clase);
  
    const modal = await this.modalCtrl.create({
      component: ModalQrComponent,
      componentProps: { qrData },
    });
  
    await modal.present();
  }

  verDetalle(clase: any) {
    this.claseSeleccionada = clase; // Almacena la clase seleccionada
    console.log('Detalle de la clase:', this.claseSeleccionada);
  }

  cerrarSesion() {
    // Aquí puedes agregar la lógica para cerrar sesión
    console.log('Cerrar Sesión');
  }
}
