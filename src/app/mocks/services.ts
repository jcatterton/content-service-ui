import { Observable, of } from "rxjs";
import { LoginRequest } from "../models/user";
import { MatDialogConfig } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/portal";
import {SnackBarPanelClass} from "../services/snackbar/snackbar.service";

export class MockMatDialog {
  open(component: ComponentType<any>, config?: MatDialogConfig) {
    return{
      afterClosed() {
        return of({});
      }
    }
  }

  close(dialogResult?: any): void {};

  closeAll(): void {};
}

export class MockSnackBarService {
  showMessage(msg: string, panelClass: SnackBarPanelClass) {};
}

export class MockHttpService {
  get<T>(url: string): Observable<any> {
    return of(null);
  }

  post<T>(url: string, body: any): Observable<any> {
    return of(null);
  }

  put<T>(url: string, body: any): Observable<any> {
    return of(null);
  }

  delete<T>(url: string): Observable<any> {
    return of(null);
  }
}

export class MockLoginService {
  generateToken(user: LoginRequest): Observable<any> {
    return of(null);
  }

  validateToken(): Observable<any> {
    return of(null);
  }
}
