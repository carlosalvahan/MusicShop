import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ACGridComponent, ButtonOutput } from '../../shared/grid/grid.component';
import { ColumnModelMapper } from '../../shared/grid/column-model-mapper/column-model-mapper.service';
import { UserModel } from '../../../store/user/user-model'
import type { ColDef } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { UserListActions } from '../../../store/user-list/user-list-actions';
import { Observable } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { userListState } from '../../../store/user-list/user-list-model';
import { UserListService } from './services/user-list.service';
import { ToastService } from '../../shared/toast/toast-service';
import { ModalComponent, ModalContent } from '../../shared/modal/modal.component';
import { ModalService } from '../../shared/modal/modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnsubClass } from '../../shared/unsub-components/unsub-class';
import { UserDetailComponent } from './user-detail/user-detail/user-detail.component';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [ACGridComponent, AsyncPipe, LoaderComponent, ModalComponent, NgClass, UserDetailComponent],
  templateUrl: './users-page.component.html',
  providers: [ColumnModelMapper, UserListService, NgbModal],
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent extends UnsubClass implements OnInit {
  @ViewChild('userDetailTemplate', { static: false }) userDetailTemplate!: TemplateRef<any>;
  mapper = inject(ColumnModelMapper);
  store = inject(Store);
  toast = inject(ToastService)
  userService = inject(UserListService);
  modalService = inject(ModalService);
  ngbModalService = inject(NgbModal);
  userListState$ = new Observable<userListState>;
  modalContent: ModalContent = new ModalContent();
  userData: any[] = [];
  colData: ColDef[] = [];
  userEdit: UserModel = new UserModel();


  ngOnInit(): void {
    this.colData = this.mapper.mapModelToColumn(new UserModel(), ['id']);
    this.userListState$ = this.store.select('userList');
    this.subList.push(
      this.userService.getAllUsers().subscribe(res => {
        this.store.dispatch(UserListActions.getUserList({ users: res }));
      })
    );
  }


  gridButtonClicked(e: ButtonOutput) {
    switch(e.type) {
      case 'delete': this.deleteUserConfirm(e?.data);break;
      case 'edit': {
        this.userEdit = {
          ...this.userEdit,
          ...e?.data
        }
        this.editUser()
      };break;
      default: 
    }
  }

  editUser() {
    this.ngbModalService.open(this.userDetailTemplate, {size: 'lg'});
  }

  deleteUserConfirm(data: any) {
    this.modalContent = {
      ...this.modalContent,
      message: 'Are you sure you want to continue?',
      title: 'Delete user'
    }
    this.modalService.open(this.modalContent, { size: 'sm' }).result.then(res => {
      if (res) {
        this.deleteUser(data);
      }
    }, (e) => {});
  }

  deleteUser(data: any) {
    this.store.dispatch(UserListActions.userLoading({ loading: true }));
    this.subList.push(
      this.userService.deleteUser(data.id).subscribe({
        next: (res: any) => {
          if (res?.isSuccess) {
            this.toast.show({ message: res?.message }, 'success');
            this.store.dispatch(UserListActions.deleteUser({ id: data?.id }));
          } else {
            this.toast.show({ message: 'Something went wrong' }, 'danger');
            this.store.dispatch(UserListActions.userLoading({ loading: false }));
          }
        },
        error: (e) => {
          this.toast.show({ message: e?.error?.message }, 'danger');
          this.store.dispatch(UserListActions.userLoading({ loading: false }));
        }
      })
    );
  }

}
