import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerRef: OverlayRef = this.cdkSpinnerCreate();

  constructor(private overlay: Overlay) { }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
  }

  showSpinner() {
    setTimeout(() => this.spinnerRef.attach(new ComponentPortal(MatSpinner)));
  }

  stopSpinner() {
    this.spinnerRef.detach();
  }
}
