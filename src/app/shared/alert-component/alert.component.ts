import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() message: { header: string, title: string, message: string, type: string, icon: string };
  @Output() close = new EventEmitter<void>();

  constructor() {

  }

  ngOnInit() {

    console.log(this.message);
  }

  removeMessage() {
    this.close.emit();
  }
}
