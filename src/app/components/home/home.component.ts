import {Component, OnInit} from '@angular/core';
import {FileService} from "../../services/file/file.service";
import {File} from "../../models/file";
import {SnackBarPanelClass, SnackbarService} from "../../services/snackbar/snackbar.service";
import {saveAs} from "file-saver";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {UpdateFileComponent} from "../update-file/update-file.component";
import {LoginService} from "../../services/login/login.service";
import {Router} from "@angular/router";
import {DetailsComponent} from "../details/details.component";
import {Extensions} from "../../models/extensions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  files: File[] = [];
  filteredFiles: File[] = [];
  selectedFile: File;
  loading = false;
  extensions: string[] = [];
  extensionFilter: string = "";
  nameFilter: string = "";
  activeSort: string = "";
  $search: HTMLElement;
  multiSelect = false;
  selectedFiles: File[] = [];
  showHiddenFiles = false;
  logoURL: string;

  constructor(
    private fileService: FileService,
    private snackBarService: SnackbarService,
    private dialogService: MatDialog,
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginService.validateToken().subscribe(() => {
      this.loadFiles();
      this.$search = document.getElementById("search");
      this.logoURL = this.fileService.getFileImage("60773e258b5bf67a1843f084");
    }, () => {
      this.router.navigate([""]);
    });

  }

  loadFiles(): void {
    this.loading = true;
    this.files = [];
    this.fileService.getFiles().subscribe(response => {
      response.forEach(f => {
        this.files.push({
          id: f.id,
          name: f.name,
          extension: f.extension,
          size: f.size,
          timestamp: f.timestamp,
          url: f.extension === ".docx" || f.extension === ".doc" ? this.fileService.getDocPreview(f.id) : this.fileService.getPDFPreview(f.id),
          selected: false,
          hidden: f.hidden
        } as File);
        if (!this.extensions.includes(f.extension)) {
          this.extensions.push(f.extension);
        }
      });
      this.filteredFiles = this.showHiddenFiles ? this.files : this.files.filter(f => !f.hidden);
      this.loading = false;
    }, err => {
      console.log(err);
      this.snackBarService.showMessage("Error loading files", SnackBarPanelClass.fail);
    });
  }

  showMenu(file: File, event): void {
    const ele = document.getElementById(file.id);
    const menu = document.getElementById("menu");
    menu.style.top = `${event.clientY}px`;
    menu.style.left = `${event.clientX}px`;
    menu.classList.remove('hidden');
    this.selectedFile = file;
    console.log(this.selectedFile.name);
    this.addClickAwayListener(ele, menu);
  }

  addClickAwayListener(ele: HTMLElement, menu: HTMLElement): void {
    const documentClickHandler = function(e) {
      const isClickedOutside = !ele.contains(e.target);
      if (isClickedOutside) {
        menu.classList.add("hidden");
        document.removeEventListener("click", documentClickHandler);
      }
    };

    document.addEventListener('click', documentClickHandler);
  }

  downloadFile(): void {
    this.fileService.downloadFile(this.selectedFile.id).subscribe((response: Blob) => {
      saveAs(response, this.selectedFile.name);
    }, err => {
      console.log(err);
      this.snackBarService.showMessage("Error downloading file", SnackBarPanelClass.fail);
    });
  }

  deleteFile(): void {
    const dialogRef = this.dialogService.open(ConfirmationDialogComponent, { width: "700px" });
    dialogRef.componentInstance.message = `Are you sure you want to delete ${this.selectedFile.name}?`;
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.loading = true;
        this.fileService.deleteFile(this.selectedFile.id).subscribe(() => {
          this.snackBarService.showMessage("File deleted successfully", SnackBarPanelClass.success);
          this.loadFiles();
        }, err => {
          console.log(err);
          this.snackBarService.showMessage("Error deleting file", SnackBarPanelClass.fail);
        })
      }
    })
  }

  editFile(): void {
    const dialogRef = this.dialogService.open(UpdateFileComponent, { width: "700px" });
    dialogRef.componentInstance.file = this.selectedFile;
    dialogRef.afterClosed().subscribe(output => {
      if (output !== undefined) {
        this.loading = true;
        this.fileService.updateFileInfo(this.selectedFile.id, output).subscribe(() => {
          this.loadFiles();
          this.snackBarService.showMessage("File updated successfully", SnackBarPanelClass.success);
        }, err => {
          console.log(err);
          this.snackBarService.showMessage("Error updating file", SnackBarPanelClass.fail);
        })
      }
    })
  }

  uploadFile(event): void {
    const fd = new FormData();
    fd.append("file", event.target.files[0]);
    this.loading = true;
    this.fileService.uploadFile(fd).subscribe(response => {
      this.snackBarService.showMessage("File uploaded successfully", SnackBarPanelClass.success);
      this.loadFiles();
    }, err => {
      console.log(err);
      this.snackBarService.showMessage("Error uploading file", SnackBarPanelClass.fail);
      this.loading = false;
    })
  }

  openFileDetails(): void {
    const dialogRef = this.dialogService.open(DetailsComponent, { width: "700px" });
    dialogRef.componentInstance.file = this.selectedFile;
  }

  isImage(file: File): boolean {
    return Extensions.imageExtensions.includes(file.extension);
  }

  isDocument(file: File): boolean {
    return Extensions.documentExtensions.includes(file.extension);
  }

  isAudio(file: File): boolean {
    return Extensions.audioExtensions.includes(file.extension);
  }

  isNonPreviewable(file: File): boolean {
    return !(this.isImage(file) || this.isDocument(file) || this.isAudio(file))
  }

  getNonPreviewablePlaceholder(file: File): string {
    switch (file.extension) {
      case ".zip":
        return this.fileService.getFileImage("607c8e63f2fea0dd63344ec3");
      case ".mp3":
        return this.fileService.getFileImage("607c8e66f2fea0dd63344ec6");
      default:
        return this.fileService.getFileImage("607c8e61f2fea0dd63344ec0");
    }
  }

  filterChanged(): void {
    this.filteredFiles = this.files.filter(f => f.name.includes(this.nameFilter));
    if (this.extensionFilter !== "") {
      this.filteredFiles = this.filteredFiles.filter(f => f.extension === this.extensionFilter);
    }
    if (!this.showHiddenFiles) {
      this.filteredFiles = this.filteredFiles.filter(f => !f.hidden)
    }
  }

  applyNameFilter(event): void {
    this.nameFilter = event;
    this.filterChanged();
  }

  applyExtensionFilter(ext: string): void {
    this.extensionFilter === ext ? this.extensionFilter = "" : this.extensionFilter = ext;
    this.filterChanged();
  }

  clearFilters(): void {
    this.nameFilter = "";
    this.extensionFilter = "";
    this.applySort("");
    (this.$search as  HTMLInputElement).value = "";
    this.filterChanged();
  }

  applySort(sortOption: string): void {
    this.activeSort = sortOption;
    this.filteredFiles = this.filteredFiles.sort(function(a: File, b: File) {
      if (sortOption === "Name") {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      } else if (sortOption === "Extension") {
        return a.extension.localeCompare(b.extension);
      } else if (sortOption === "Size") {
        if (a.size > b.size) {
          return 1;
        } else if (a.size < b.size) {
          return -1
        }
        return 0;
      } else {
        if (a.timestamp > b.timestamp) {
          return 1;
        } else if (a.timestamp < b.timestamp) {
          return -1;
        }
        return 0;
      }
    });
  }

  toggleMultiSelect(): void {
    this.multiSelect = !this.multiSelect;
    if (!this.multiSelect) {
      this.selectedFiles.forEach(file => {
        file.selected = false;
      });
      this.selectedFiles = [];
    }
  }

  selectFile(file: File): void {
    file.selected = !file.selected;
    if (file.selected) {
      this.selectedFiles.push(file)
    } else {
      const index = this.selectedFiles.indexOf(file);
      this.selectedFiles.splice(index, 1);
    }
  }

  downloadSelectedFiles(): void {
    let error = null;
    this.selectedFiles.forEach(file => {
      this.fileService.downloadFile(file.id).subscribe((response: Blob) => {
        saveAs(response, file.name);
      }, err => {
        console.log(err);
        error = err;
      });
    });
    if (error !== null) {
      this.snackBarService.showMessage("Some files could not be downloaded", SnackBarPanelClass.fail);
    }
  }

  getTotalFiles(): number {
    return this.showHiddenFiles ? this.files.length : this.files.filter(f => !f.hidden).length;

  }

  toggleHiddenFiles(): void {
    this.showHiddenFiles = !this.showHiddenFiles;
    this.filterChanged();
  }
}
