import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Obtener UID del usuario autenticado
  getUid(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map(authState => (authState ? authState.uid : null))
    );
  }

  // Función para iniciar sesión
  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Función para cerrar sesión
  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}