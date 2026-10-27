import { describe, expect, it } from "vitest"
import i18n from "."

describe("fixed Simplified Chinese interface", () => {
  it("starts the interface in Chinese without falling back to English first", () => {
    expect(i18n.language).toBe("zh")
    expect(i18n.options.fallbackLng).toContain("zh")
  })
})
