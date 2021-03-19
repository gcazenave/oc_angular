import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppareilService {

  appareilsSubject = new Subject<any[]>();

  private appareils: any[];
  //private appareils = [
  //  {
  //    id: 1,
  //    name: 'Machine à laver',
  //    status: 'éteint'
  //  },
  //  {
  //    id: 2,
  //    name: 'Frigo',
  //    status: 'allumé'
  //  },
  //  {
  //    id: 3,
  //    name: 'Ordinateur',
  //    status: 'éteint'
  //  }
  //];
  
  constructor(private httpClient: HttpClient) { }

  saveAppareilsToServer() {
    this.httpClient
      .put('https://angular-oc-9ec5e.firebaseio.com/appareils.json', this.appareils)
      //.post('https://angular-oc-9ec5e.firebaseio.com/appareils.json', this.appareils) first sending
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getAppareilsFromServer() {
    this.httpClient
      .get<any[]>('https://angular-oc-9ec5e.firebaseio.com/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  
  emitAppareilSubject() {
    //console.log(this.appareils);
    this.appareilsSubject.next(this.appareils.slice());
  }

  switchOnAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'éteint';
      this.emitAppareilSubject();
    }
  }

  switchOnOne(i: number) {
    this.appareils[i].status = 'allumé';
    this.emitAppareilSubject();
  }

  switchOffOne(i: number) {
    this.appareils[i].status = 'éteint';
    this.emitAppareilSubject();
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (s) => {
        return s.id === id;
      }
    );
    return appareil;
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    let maxId = this.getMaxId();
    console.log(maxId);
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = maxId + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  getMaxId(){
    return Math.max.apply(Math, this.appareils.map(function(o) { return o.id; }));
  }
}