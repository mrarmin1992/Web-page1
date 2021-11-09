import { Component, OnInit } from '@angular/core';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-kraj',
  templateUrl: './kraj.component.html',
  styleUrls: ['./kraj.component.css']
})
export class KrajComponent implements OnInit {

  constructor(public kraj: FooterService) { }

  ngOnInit(): void {
  }

}
