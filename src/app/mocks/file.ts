import { FileResponse } from "../models/file";

export class MockFile {
  static mockFileResponse = {
    id: "test",
    name: "testFile",
    timestamp: new Date(),
    extension: ".png",
    size: 1,
    fileID: "testFile",
    hidden: false
  } as FileResponse;

  static mockImageFile = {
    id: "test",
    name: "testFile",
    timestamp: new Date(),
    extension: ".png",
    size: 1,
    fileID: "testFile",
    url: "testURL",
    selected: false,
    hidden: false
  };

  static mockDocFile = {
    id: "test",
    name: "testFile",
    timestamp: new Date(),
    extension: ".docx",
    size: 1,
    fileID: "testFile",
    url: "testURL",
    selected: false,
    hidden: false
  };

  static mockNonPreviewableFile = {
    id: "test",
    name: "testFile",
    timestamp: new Date(),
    extension: ".zip",
    size: 1,
    fileID: "testFile",
    url: "testURL",
    selected: false,
    hidden: false
  }
}
