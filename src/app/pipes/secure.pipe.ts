import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  transform(url: string): Observable<SafeResourceUrl> {
    return this.http
      .get(url, { responseType: 'blob' , headers: {Authorization: `Bearer ${localStorage.getItem("justin-token")}`}})
      .pipe(map(val => this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(val))));
  }
}
