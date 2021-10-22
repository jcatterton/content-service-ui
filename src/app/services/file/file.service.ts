import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";
import { FileResponse } from "../../models/file";
import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  readonly baseURL = "api";

  constructor(
    private httpService: HttpService
  ) { }

  uploadFile(fd: FormData): Observable<HttpResponse<object>> {
    return this.httpService.post(`${this.baseURL}/upload`, fd);
  }

  downloadFile(id: string): Observable<Blob> {
    return this.httpService.getBlob(`${this.baseURL}/file/${id}`);
  }

  deleteFile(id: string): Observable<HttpResponse<object>> {
    return this.httpService.delete(`${this.baseURL}/file/${id}`);
  }

  updateFileInfo(id: string, fd: FormData): Observable<HttpResponse<object>> {
    return this.httpService.put(`${this.baseURL}/file/${id}`, fd);
  }

  getFiles(): Observable<FileResponse[]> {
    return this.httpService.get(`${this.baseURL}/files`);
  }

  getFileImage(id: string): string {
    return `${this.baseURL}/file/${id}`;
  }

  getPDFPreview(id: string): string {
    const a = `${this.baseURL}/file/${id}`;
    console.log(a);
    return a;
  }

  getDocPreview(id: string): string {
    return `${this.baseURL}/preview/${id}`
  }
}
