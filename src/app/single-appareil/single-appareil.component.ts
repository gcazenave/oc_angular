import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.css']
})
export class SingleAppareilComponent implements OnInit {

  name: string = 'Appareil';
  status: string = 'Statut';

  constructor(private appareilService: AppareilService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    let app = this.appareilService.getAppareilById(+id);
    console.log(app);
    if(app){
      this.name = app.name;
      this.status = app.status;
    }
    else{      
      this.router.navigate(['appareils']);
    }    
  }

}
