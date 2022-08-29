import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  @Input() message: { header: string, message: string };
  @Output() close = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  closeModal(confirmed: boolean) {
    this.close.emit(confirmed);
  }
}
