import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-clase-detalle-popover',
  template: `
    <ion-list>
      <ion-item>
        <ion-label>Código:</ion-label>
        <ion-note slot="end">{{ codigo }}</ion-note>
      </ion-item>
      <ion-item>
        <ion-label>Sección:</ion-label>
        <ion-note slot="end">{{ seccion }}</ion-note>
      </ion-item>
      <!-- Agrega más información según tus necesidades -->
    </ion-list>
    <ion-button expand="full" (click)="cerrarPopover()">Cerrar</ion-button>
  `,
})
export class ClaseDetallePopoverComponent {
  @Input() codigo: string;
  @Input() seccion: string;

  constructor(private popoverController: PopoverController) {}

  cerrarPopover() {
    this.popoverController.dismiss();
  }
}