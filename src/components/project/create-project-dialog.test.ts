import { describe, expect, it } from "vitest"
import { getCreateProjectFormStatus } from "./create-project-dialog"

describe("create project form in the fixed-Chinese build", () => {
  it("keeps the initial disabled state quiet before the user interacts", () => {
    expect(getCreateProjectFormStatus("", "", "", "", false)).toEqual({
      missingRequired: true,
      canCreate: false,
      footerError: "",
      footerMessageKey: null,
    })
  })

  it("does not require an AI output language selection", () => {
    expect(getCreateProjectFormStatus("Research", "/Users/me", "", "", true)).toEqual({
      missingRequired: false,
      canCreate: true,
      footerError: "",
      footerMessageKey: null,
    })
  })

  it("still treats a whitespace-only name as missing", () => {
    expect(getCreateProjectFormStatus("   ", "/Users/me", "", "", true)).toEqual({
      missingRequired: true,
      canCreate: false,
      footerError: "",
      footerMessageKey: "project.requiredHint",
    })
  })

  it("still treats a whitespace-only path as missing", () => {
    expect(getCreateProjectFormStatus("Research", "   ", "", "", true)).toEqual({
      missingRequired: true,
      canCreate: false,
      footerError: "",
      footerMessageKey: "project.requiredHint",
    })
  })

  it("prefers server errors over the required-fields hint", () => {
    expect(getCreateProjectFormStatus("", "", "", "Permission denied", true)).toEqual({
      missingRequired: true,
      canCreate: false,
      footerError: "Permission denied",
      footerMessageKey: null,
    })
  })

  it("keeps the form ready when only a server error is present", () => {
    expect(getCreateProjectFormStatus("Research", "/Users/me", "", "Permission denied", true)).toEqual({
      missingRequired: false,
      canCreate: true,
      footerError: "Permission denied",
      footerMessageKey: null,
    })
  })
})
