import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';





@Component({
  selector: 'app-usluge',
  templateUrl: './usluge.component.html',
  styleUrls: ['./usluge.component.css']
})
export class UslugeComponent implements OnInit {
  list = [0, 1, 2, 3, 4];

  constructor(
              private storage: AngularFireStorage) { }

  ngOnInit() {
  }
}
