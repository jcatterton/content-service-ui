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
}

