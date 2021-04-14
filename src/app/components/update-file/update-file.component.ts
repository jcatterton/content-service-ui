import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { File } from "../../models/file";

@Component({
  selector: 'app-update-file',
  templateUrl: './update-file.component.html',
  styleUrls: ['./update-file.component.scss']
})
export class UpdateFileComponent implements OnInit {
  file: File;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateFileComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.file.name,
    });
  }

  cancel() {
    this.dialogRef.close(undefined);
  }

  updateFile() {
    const file = {
      name: this.form.controls["name"].value,
    };

    this.dialogRef.close(file);
  }
}
