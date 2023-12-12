// Importa los módulos necesarios
import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  // ======= Autenticación =======

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  updateUser(displayName: string) {
    // Asegúrate de que displayName no sea nulo o indefinido antes de llamar a updateProfile
    const currentUser = getAuth().currentUser;
    if (currentUser && displayName !== undefined && displayName !== null) {
      return updateProfile(currentUser, { displayName });
    } else {
      // Maneja el caso en el que currentUser sea nulo o displayName sea nulo/undefined
      return Promise.reject("No se puede actualizar el perfil. Usuario actual nulo o nombre de usuario no válido.");
    }
  }

  // ======= Base de Datos =======

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  obtenerClases(): Observable<any[]> {
    return this.firestore.collection('clases').valueChanges();
  }
}