import { Component, Input, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.css']
})
export class AppareilComponent  implements OnInit {

  @Input() appareilName: string;
  @Input() appareilStatus: string;
  @Input() id: number;
  @Input() index: number;

  constructor(private appareilService: AppareilService) { }

  ngOnInit() {
  } 

  getStatus() {
    return this.appareilStatus;
  }

  getColor() {
    return this.appareilStatus == 'allumé' ? 'green' : 'red';
  }

  onSwitch() {
    if(this.appareilStatus === 'allumé') {
      this.appareilService.switchOffOne(this.index);
    } else if(this.appareilStatus === 'éteint') {
      this.appareilService.switchOnOne(this.index);
    }
  }

}