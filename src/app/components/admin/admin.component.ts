import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

// Services
import { ResourceService } from "../../services/index.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  configurationsParams:any;

  configurationForma: FormGroup = new FormGroup({
    'Logo': new FormControl('', Validators.required),
    'Name': new FormControl('', Validators.required),
    'Phone': new FormControl('', Validators.required),
  });

  constructor(public _resourceService: ResourceService) { 
    this.searchConfigurationsParams();
  }

  ngOnInit() {
  }

  searchConfigurationsParams() {
    this.configurationsParams = [];
    this._resourceService.getResource('configuration')
      .subscribe(data => {
        for (var x in data) {
          if (data[x] != null) {
            this.configurationsParams.push(data[x]);
          }
        }
      });
  }

  saveConfiguration(){
    this._resourceService.updateResource('configuration', 'params');
  }
  

  reset(){
    this.searchConfigurationsParams();
  }

}
