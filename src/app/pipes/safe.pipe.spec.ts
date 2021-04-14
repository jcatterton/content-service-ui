import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { DomSanitizer } from "@angular/platform-browser";
import { SafePipe } from "app/shared/pipes/safe.pipe";

export class MockDomSanitizer {
  sanitize() {
    return null;
  }
  bypassSecurityTrustHtml() {
    return null;
  }
  bypassSecurityTrustStyle() {
    return null;
  }
  bypassSecurityTrustScript() {
    return null;
  }
  bypassSecurityTrustUrl() {
    return null;
  }
  bypassSecurityTrustResourceUrl(url) {
    return url as string;
  }
}

describe("SafePipe", () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          {
            provide: DomSanitizer,
            useClass: MockDomSanitizer
          }
        ],
        imports: []
      }).compileComponents();
    })
  );

  describe("transform()", () => {
    it("transform() should return safe url", () => {
      const url = URL.createObjectURL(new Blob([], { type: "application/pdf" }));
      expect(new SafePipe(new MockDomSanitizer()).transform(url)).toEqual(
        new MockDomSanitizer().bypassSecurityTrustResourceUrl(url)
      );
    });
  });
});
