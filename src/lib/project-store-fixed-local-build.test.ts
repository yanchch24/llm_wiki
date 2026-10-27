import { beforeEach, describe, expect, it, vi } from "vitest"

const storage = vi.hoisted(() => new Map<string, unknown>())

vi.mock("@tauri-apps/plugin-store", () => ({
  load: vi.fn(async () => ({
    get: async <T>(key: string) => storage.get(key) as T | undefined,
    set: async (key: string, value: unknown) => {
      storage.set(key, value)
    },
    save: vi.fn(async () => undefined),
  })),
}))

describe("fixed-Chinese local preferences", () => {
  beforeEach(() => {
    storage.clear()
  })

  it("forces the interface language to Chinese even when English was persisted", async () => {
    const { loadLanguage } = await import("./project-store")
    storage.set("language", "en")

    expect(await loadLanguage()).toBe("zh")
  })

  it("forces AI output language to Chinese for global and existing project settings", async () => {
    const { loadOutputLanguage } = await import("./project-store")
    storage.set("outputLanguage", "English")
    storage.set("projectOutputLanguages", { "project-a": "Japanese" })

    expect(await loadOutputLanguage()).toBe("Chinese")
    expect(await loadOutputLanguage("project-a")).toBe("Chinese")
  })

  it("persists Chinese instead of accepting another output language", async () => {
    const { loadOutputLanguage, saveOutputLanguage } = await import("./project-store")
    await saveOutputLanguage("English" as never, "project-a")

    expect(await loadOutputLanguage("project-a")).toBe("Chinese")
    expect(storage.get("outputLanguage")).toBe("Chinese")
    expect(storage.get("projectOutputLanguages")).toEqual({ "project-a": "Chinese" })
  })

  it("disables the startup update check even when it was previously enabled", async () => {
    const { loadUpdateCheckState } = await import("./project-store")
    storage.set("updateCheckState", {
      enabled: true,
      lastCheckedAt: Date.now(),
      dismissedVersion: null,
    })

    expect(await loadUpdateCheckState()).toEqual({
      enabled: false,
      lastCheckedAt: null,
      dismissedVersion: null,
    })
  })
})
