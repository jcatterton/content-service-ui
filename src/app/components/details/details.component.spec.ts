import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import {FileService} from "../../services/file/file.service";
import {HttpService} from "../../services/http/http.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {SizePipe} from "../../pipes/size.pipe";
import {MockFile} from "../../mocks/file";
import {SecurePipe} from "../../pipes/secure.pipe";
import {MockFileService} from "../../mocks/services";

fdescribe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let httpMock: HttpClient;
  let fileService: MockFileService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DetailsComponent,
        SizePipe,
        SecurePipe
      ],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: FileService, useClass: MockFileService }
      ]
    })
    .compileComponents();

    httpMock = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    component.file = MockFile.mockImageFile;
    fileService = TestBed.inject(FileService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("getFileURL", () => {
    it("should call fileService getFileImage", () => {
      const getFileImageSpy = spyOn(fileService, "getFileImage");
      component.getFileUrl();
      expect(getFileImageSpy).toHaveBeenCalled();
    });
  });

  describe("isImage", () => {
    it("should return true if extension is in Extensions.imageExtensions array", () => {
      expect(component.isImage()).toBeTruthy();
    });

    it("should return false if extension is not in Extensions.imageExtensions array", () => {
      component.file = MockFile.mockDocFile;
      expect(component.isImage()).toBeFalsy();
    });
  });

  describe("isDocument", () => {
    it("should return true if extension is in Extensions.documentExtensions array", () => {
      expect(component.isDocument()).toBeFalsy();
    });

    it("should return false if extension is not in Extensions.documentExtensions array", () => {
      component.file = MockFile.mockDocFile;
      expect(component.isDocument()).toBeTruthy();
    });
  });

  describe("isNonPreviewable", () => {
    it("should return true if extension is not in Extensions.imageExtensions or Extensions.documentExtensions arrays", () => {
      component.file = MockFile.mockNonPreviewableFile;
      expect(component.isNonPreviewable()).toBeTruthy();
    });

    it("should return false if extension is in either Extensions.imageExtensions or Extensions.documentExtensions arrays", () => {
      expect(component.isNonPreviewable()).toBeFalsy();
    });
  });

  describe("getNonPreviewablePlaceholder", () => {
    it("should call getFileImage with zip ID if extension is zip", () => {
      component.file = MockFile.mockNonPreviewableFile;
      component.file.extension = ".zip";
      const getFileImageSpy = spyOn(fileService, "getFileImage");
      component.getNonPreviewablePlaceholder();
      expect(getFileImageSpy).toHaveBeenCalledWith("607c8e63f2fea0dd63344ec3");
    });

    it("should call getFileImage with mp3 ID if extension is mp3", () => {
      component.file = MockFile.mockNonPreviewableFile;
      component.file.extension = ".mp3";
      const getFileImageSpy = spyOn(fileService, "getFileImage");
      component.getNonPreviewablePlaceholder();
      expect(getFileImageSpy).toHaveBeenCalledWith("607c8e61f2fea0dd63344ec0");
    });

    it("should call getFileImage with default ID if extension is non zip or mp3", () => {
      component.file = MockFile.mockNonPreviewableFile;
      component.file.extension = ".test";
      const getFileImageSpy = spyOn(fileService, "getFileImage");
      component.getNonPreviewablePlaceholder();
      expect(getFileImageSpy).toHaveBeenCalledWith("607c8e61f2fea0dd63344ec0");
    });
  });
});
