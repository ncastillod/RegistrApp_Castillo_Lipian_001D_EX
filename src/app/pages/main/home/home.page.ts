import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';


import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  
  qrCodeString= 'String qr';

  uid: string | null = null;

  axes: string;

  isSupported = false;

  barcodes: Barcode[] = [];

  constructor(
    private menuController: MenuController, 
    private authService: AuthService,
    private alertController: AlertController
    ) {
      this.axes = ''
     }

  ngOnInit() {
   
 
    // Inicializar el UID al cargar el componente
    this.authService.getUid().subscribe(uid => {
      this.uid = uid;
    });


    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  mostrarMenu() {
    this.menuController.open('first');
  }

  

  mostrarUid() {
    // Esta función se llama al hacer clic en el botón
    console.log('UID del usuario:', this.uid);
  }


  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}

  

  

  

  


