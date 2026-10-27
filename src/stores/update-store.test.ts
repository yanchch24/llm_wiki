import { describe, expect, it } from "vitest"
import type { UpdateStatus } from "@/lib/update-check"
import {
  hasAvailableUpdate,
  shouldShowUpdateBanner,
  type UpdateStoreState,
} from "./update-store"

const available: UpdateStatus = {
  kind: "available",
  local: "v0.0.1",
  remote: "v999.0.0",
  release: {
    tag_name: "v999.0.0",
    name: "v999.0.0",
    body: "Upstream release",
    html_url: "https://github.com/nashsu/llm_wiki/releases",
    published_at: "2026-01-01T00:00:00Z",
  },
}

function stateWithAvailableUpdate(): UpdateStoreState {
  return {
    checking: false,
    lastResult: available,
    lastCheckedAt: Date.now(),
    dismissedVersion: null,
    enabled: true,
    setChecking: () => {},
    setResult: () => {},
    setDismissed: () => {},
    setEnabled: () => {},
    hydrate: () => {},
  }
}

describe("hidden upstream update UI", () => {
  it("suppresses update indicators and banners in the local fixed-Chinese build", () => {
    const state = stateWithAvailableUpdate()

    expect(hasAvailableUpdate(state)).toBe(false)
    expect(shouldShowUpdateBanner(state)).toBe(false)
  })
})
