import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogos',
  templateUrl: './dialogos.component.html',
  styleUrls: ['./dialogos.component.scss']
})
export class DialogosComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public conteudo:string) { }

  ngOnInit(): void {
  }

}
