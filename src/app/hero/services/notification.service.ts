import { Injectable, inject } from '@angular/core';
import {ToastrService} from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly _toastr = inject(ToastrService);

  public notificationSuccess(message: string, title: string) {
    this._toastr.success(message, title, {
      timeOut: 10000
    });
  }

  public notificationError(message: string, title: string) {
    this._toastr.error(message, title, {
      timeOut: 26000
    });
  }

  public notificationWarning(message: string, title: string) {
    this._toastr.warning(message, title,{
      timeOut: 20000
    });
  }

  public notificationInfo(message: string, title: string) {
    this._toastr.info(message, title,{
      timeOut: 10000
    });
  }

}
