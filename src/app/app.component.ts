import { AfterViewInit, Component, inject, input, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastsContainer } from './components/shared/toast/toast-container.component';
import { Store } from '@ngrx/store';
import { StorageService } from './components/shared/storage/storage-service';
import { ModalService } from './components/shared/modal/modal.service';
import { ModalComponent, ModalContent } from './components/shared/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ToastsContainer, ModalComponent],
  providers: [ModalService, NgbModal],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  title = 'music-shop';
  storageService = inject(StorageService);
  store = inject(Store);


  ngAfterViewInit(): void {
    // this.modalService.setTemplate(this.appModal);
  }
  
}
