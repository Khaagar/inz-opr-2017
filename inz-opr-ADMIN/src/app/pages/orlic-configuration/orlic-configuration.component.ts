import { Component, OnInit } from '@angular/core';
import { OrlikService } from '../../services/orlik.service';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
@Component({
  selector: 'app-orlic-configuration',
  templateUrl: './orlic-configuration.component.html',
  styleUrls: ['./orlic-configuration.component.css'],
  providers: [OrlikService]
})
export class OrlicConfigurationComponent implements OnInit {

  orliks: any;
  orlik = {};
  
  constructor(private orlikService: OrlikService) { }

  ngOnInit() {
    this.getOrliks();
  }
  getOrliks() {
    this.orlikService.getAllOrliks()
      .subscribe(orliks => {
        this.orliks = orliks;
      })
  }
  usunOrlik(id) {
    console.log(id);
    this.orlikService.deleteOrlik(id)
      .subscribe(data => {
        this.getOrliks();

      })
  }

  dodajOrlik() {
    console.log(this.orlik);
    this.orlikService.addOrlik(this.orlik);
    this.orlik = {};
    var vm = this;
    setTimeout(function () {
      vm.getOrliks();
    }, 1000);
  }

  aktualizujOrlik(orlik){
    this.orlikService.updateStatus(orlik).subscribe(data=>{
      orlik = data;
      this.getOrliks();
    })
  }
}
