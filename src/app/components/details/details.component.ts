import { Component } from '@angular/core';
import {File, FileResponse} from "../../models/file";
import {Extensions} from "../../models/extensions";
import {FileService} from "../../services/file/file.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  file: File;

  constructor(
    private fileService: FileService
  ) {}

  getFileUrl(): string {
    return this.fileService.getFileImage(this.file.id);
  }

  isImage(): boolean {
    return Extensions.imageExtensions.includes(this.file.extension);
  }

  isDocument(): boolean {
    return Extensions.documentExtensions.includes(this.file.extension);
  }

  isAudio(): boolean {
    return Extensions.audioExtensions.includes(this.file.extension);
  }

  isNonPreviewable(): boolean {
    return !this.isDocument() && !this.isImage() && !this.isAudio();
  }

  getNonPreviewablePlaceholder(): string {
    switch (this.file.extension) {
      case ".zip":
        return this.fileService.getFileImage("607c8e63f2fea0dd63344ec3");
      default:
        return this.fileService.getFileImage("607c8e61f2fea0dd63344ec0");
    }
  }
}

