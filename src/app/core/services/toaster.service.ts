import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  showMessage(error? ) {
   
    if (error) {
      const errors = error.error.messages || [];
      for (const item of errors) {
        this.toastr.error('', item);
      }
    } else {
      this.toastr.success('Success!');
    }

  }
}
