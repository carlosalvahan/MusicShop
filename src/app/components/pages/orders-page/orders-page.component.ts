import { Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { OrderService } from './services/order-service';
import { StorageService } from '../../shared/storage/storage-service';
import { sessionKeys } from '../../../app.constants';
import type { ColDef } from 'ag-grid-community';
import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';
import { ColumnModelMapper } from '../../shared/grid/column-model-mapper/column-model-mapper.service';
import { Order } from './services/order-model';
import { ACGridComponent, ButtonOutput, CustomGridButtons } from '../../shared/grid/grid.component';
import { NgClass } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { OrderAdmin } from './services/order-admin-model';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [ACGridComponent, NgClass, LoaderComponent, OrderDetailComponent],
  providers: [OrderService, ColumnModelMapper, NgbModal],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent implements OnInit, OnDestroy{
  @ViewChild('orderItems', { static: false }) orderDetailTemplate!: TemplateRef<any>;

  orderService = inject(OrderService);
  storageService = inject(StorageService);
  modalService = inject(NgbModal);

  mapper = inject(ColumnModelMapper);
  subList: Subscription[] = [];
  colData: ColDef[] = [];
  rowData: any[] = [];
  gridButtons: CustomGridButtons[] = [
    {iconClass: 'bi bi-cart-check-fill', buttonClass: 'btn btn-outline-info', actionName: 'viewOrder'}
  ];
  showLoader: boolean = false;
  cartId: number = 0;
  

  ngOnInit(): void {
    const storageToken = this.storageService.getItemFromSession<string>(sessionKeys.authToken) || '';
    const userPermString = this.storageService.getItemFromSession<string>(sessionKeys.userPerm) || '';
    const isAdmin = JSON.parse(userPermString)?.role?.toLowerCase() === 'admin';
    const userId = jwtDecode(storageToken).sub || '';
    this.showLoader = true;
    const orderRequest = isAdmin ?  this.orderService.getOrdersAdmin() : this.orderService.getOrdersByUser(userId);
    const model = isAdmin ?  new OrderAdmin() : new Order();
    if(isAdmin) {
      this.gridButtons.push({iconClass: 'bi bi-person-fill', buttonClass: 'btn btn-outline-warning ms-1', actionName: 'viewUsers'})
    }
    this.colData = this.mapper.mapModelToColumn(model, ['cartID']);
    this.subList.push(
      orderRequest.subscribe({
        next: res => {
          this.rowData = Object.assign([], res);
          this.showLoader = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subList.forEach(sub => { sub.unsubscribe() })
  }

  gridButtonClicked(e: ButtonOutput) {
    console.log(this.orderDetailTemplate);
    console.log(e.data.cartID);
      switch(e.type) {
        case 'viewUsers': console.log('viewuser');break;
        case 'viewOrder': {
          this.cartId = e.data.cartID;
          this.modalService.open(this.orderDetailTemplate, {size: 'lg'});
        };break;
        default: 
      }
    }

}
