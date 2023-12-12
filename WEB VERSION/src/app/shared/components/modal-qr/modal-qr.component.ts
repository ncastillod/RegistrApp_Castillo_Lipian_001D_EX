import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-modal-qr',
  templateUrl: './modal-qr.component.html',
  styleUrls: ['./modal-qr.component.scss'],
})
export class ModalQrComponent implements OnInit {
  clases: any[] = [];
  qrData: string = '';

  constructor(private modalCtrl: ModalController, private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.obtenerClases().subscribe((clases: any[]) => {
      this.clases = clases;
    });
  }

  generarQR(clase: any) {
    // Construye la cadena utilizando todos los campos específicos de la clase
    const qrDataString = `${clase.Clase}-${clase.Siglas}-${clase.Sección}`;
    this.qrData = qrDataString;
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}