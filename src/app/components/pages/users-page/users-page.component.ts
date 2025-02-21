import { Component, inject, OnInit } from '@angular/core';
import { ACGridComponent, ButtonOutput } from '../../shared/grid/grid.component';
import { ColumnModelMapper } from '../../shared/grid/column-model-mapper/column-model-mapper.service';
import { UserModel } from '../../../store/user/user-model'
import type { ColDef } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { UserListActions } from '../../../store/user-list/user-list-actions';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { userListState } from '../../../store/user-list/user-list-model';
import { UserListService } from './services/user-list.service';
import { ToastService } from '../../shared/toast/toast-service';
import { ModalComponent, ModalContent } from '../../shared/modal/modal.component';
import { ModalService } from '../../shared/modal/modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [ACGridComponent, AsyncPipe, LoaderComponent, ModalComponent],
  templateUrl: './users-page.component.html',
  providers: [ColumnModelMapper, UserListService, NgbModal],
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent implements OnInit {
  userData: any[] = [];
  colData: ColDef[] = [];
  mapper = inject(ColumnModelMapper);
  store = inject(Store);
  toast = inject(ToastService)
  userService = inject(UserListService);
  modalService = inject(ModalService);
  ngbModalService = inject(NgbModal);
  userListState$ = new Observable<userListState>;
  modalContent: ModalContent = new ModalContent();

  ngOnInit(): void {
    this.colData = this.mapper.mapModelToColumn(new UserModel(), ['id']);
    this.userListState$ = this.store.select('userList');
    this.userService.getAllUsers().subscribe(res => {
      this.store.dispatch(UserListActions.getUserList({ users: res }));
    });
  }

  gridButtonClicked(e: ButtonOutput) {
    // this.store.dispatch(UserListActions.userLoading({ loading: true }));
    // this.userService.deleteUser(e.data.id).subscribe({
    //   next: (res: any) => {
    //     if (res?.isSuccess) {
    //       this.toast.show({ message: res?.message }, 'success');
    //       this.store.dispatch(UserListActions.deleteUser({ id: e?.data?.id }));
    //     } else {
    //       this.toast.show({ message: 'Something went wrong' }, 'danger');
    //       this.store.dispatch(UserListActions.userLoading({ loading: false }));
    //     }
    //   },
    //   error: (e) => {
    //     this.toast.show({ message: e?.error?.message }, 'danger');
    //     this.store.dispatch(UserListActions.userLoading({ loading: false }));
    //   }
    // });
    this.modalContent = {
      ...this.modalContent,
      message: 'Are you sure you want to continue?',
      title: 'Delete user'
    }
    // this.modalService.setTemplate(this.modalContent);
    this.modalService.open(this.modalContent, {size: 'sm'}).result.then(res => {
      console.log(res);
    }, (e) => {
      console.log(e)
    });
  }

}
