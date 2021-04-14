import { TestBed } from '@angular/core/testing';
import { FileService } from './file.service';
import {HttpService} from "../http/http.service";
import {MockHttpService} from "../../mocks/services";

describe('FileService', () => {
  let service: FileService;
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpService, useClass: MockHttpService }
      ]
    });
    service = TestBed.inject(FileService);
    httpService = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("uploadFile", () => {
    it("should call http post", () => {
      const postSpy = spyOn(httpService, "post");
      service.uploadFile(new FormData());
      expect(postSpy).toHaveBeenCalled();
    });
  });

  describe("downloadFile", () => {
    it("should call http get", () => {
      const getSpy = spyOn(httpService, "get");
      service.downloadFile("test");
      expect(getSpy).toHaveBeenCalled();
    });
  });

  describe("deleteFile", () => {
    it("should call http delete", () => {
      const deleteSpy = spyOn(httpService, "delete");
      service.deleteFile("test");
      expect(deleteSpy).toHaveBeenCalled();
    });
  });

  describe("updateFileInfo", () => {
    it("should call http put", () => {
      const putSpy = spyOn(httpService, "put");
      service.updateFileInfo("test", new FormData());
      expect(putSpy).toHaveBeenCalled();
    });
  });

  describe("getFiles", () => {
    it("should call http get", () => {
      const getSpy = spyOn(httpService, "get");
      service.getFiles();
      expect(getSpy).toHaveBeenCalled();
    });
  });
});
