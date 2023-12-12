import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalQrComponent } from './modal-qr.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [ModalQrComponent],
  imports: [CommonModule, IonicModule, QRCodeModule],
})
export class ModalQrModule {}