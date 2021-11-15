import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../person/services/user/user.service';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    public alertController: AlertController,
    public toastController: ToastController
  ) {}

  async presentAlert(message: any) {
    const alert = await this.alertController.create({
      header: 'Informasi',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Berhasil',
      duration: 1000,
    });
    toast.present();
  }

  /**
   * Handle error and show it.
   */
  private errorHandling(error: HttpErrorResponse) {
    console.log(error);
    let message = 'Something wrong!';
    let errorData = error?.error;

    // error as object
    if (typeof errorData === 'object') {
      let msgList = [];

      for (let k in errorData) {
        let e = errorData[k];

        // Check is array
        if (Array.isArray(e)) {
          msgList.push(k.toUpperCase() + ': ' + e.join(' '));
        } else if (typeof e === 'object') {
          for (let kk in e) {
            let ee = e[kk];
            msgList.push(kk.toUpperCase() + ': ' + ee.join(' '));
          }
        } else {
          msgList.push(k.toUpperCase() + ': ' + e);
        }
      }

      // Print the message
      message = msgList.join(' ');
    } else {
      // Default errorData
      if (errorData && errorData?.detail) {
        message = errorData?.detail;
      }
    }

    this.presentAlert(message);

    // Return an observable with a user-facing error message.
    return throwError(error);
  }

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenAccess = this.userService.token?.access;

    if (tokenAccess) {
      httpRequest = httpRequest.clone({
        setHeaders: {
          Authorization: 'Bearer ' + tokenAccess,
        },
        withCredentials: true, // send cookies
      });
    }

    return next.handle(httpRequest).pipe(
      map((res) => {
        if (res instanceof HttpResponse) {
          if (
            (res.status === 200 &&
              (httpRequest.method == 'PATCH' ||
                httpRequest.method == 'DELETE')) ||
            (res.status === 201 && httpRequest.method == 'POST')
          ) {
            // message here
            this.presentToast();
          }
        }

        return res;
      }),
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            // Handle unauthorized error
            // console.log("Unauthorized");
            // logout() user
          } else if (err.status === 500) {
            // Handler internal server error
            // console.log("Server is not responding.")
            // alert("Try after some time.")
          }
          // ......
        }

        return this.errorHandling(err);
      })
    );
  }
}
