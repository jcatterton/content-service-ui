import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateFileComponent } from './update-file.component';
import { FormBuilder } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MockMatDialog } from "../../mocks/services";
import {SecurePipe} from "../../pipes/secure.pipe";

describe('UpdateFileComponent', () => {
  let component: UpdateFileComponent;
  let fixture: ComponentFixture<UpdateFileComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UpdateFileComponent,
        SecurePipe
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useClass: MockMatDialog }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFileComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should build form", () => {
      const formSpy = spyOn(formBuilder, "group");
      component.ngOnInit();
      expect(formSpy).toHaveBeenCalled();
    });
  });

  describe("cancel", () => {
    it("should close dialogRef", () => {
      const closeSpy = spyOn(component["dialogRef"], "close");
      component.cancel();
      expect(closeSpy).toHaveBeenCalled();
    });
  });

  describe("updateTrack", () => {
    it("should close dialogRef with track", () => {
      component.form.controls["name"].setValue("testName");
      component.form.controls["album"].setValue("testAlbum");
      component.form.controls["artist"].setValue("testArtist");
      const closeSpy = spyOn(component["dialogRef"], "close");
      component.updateFile();
      expect(closeSpy).toHaveBeenCalledWith({
        name: "testName",
        album: "testAlbum",
        artist: "testArtist",
      });
    });
  });
});
