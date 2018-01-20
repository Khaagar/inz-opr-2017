import { Component, OnInit } from '@angular/core';
import { OrlikService } from '../../services/orlik.service';

@Component({
  selector: 'app-add-orlik-modal',
  templateUrl: './add-orlik-modal.component.html',
  styleUrls: ['./add-orlik-modal.component.css'],
  providers: [OrlikService]
})
export class AddOrlikModalComponent implements OnInit {

  constructor(private orlikService: OrlikService) { }

  orlik= {
  };

  ngOnInit() {
  }
}
