/**
 * Preferences for this personal GPL-3.0 derivative build.
 *
 * Keep these switches small and centralized so upstream merges remain local:
 * the upstream language and update-check implementations stay intact, while
 * this build hides their user-facing controls and pins their effective values.
 */
import type { OutputLanguage } from "./output-language-options"

export const FIXED_UI_LANGUAGE = "zh"
export const FIXED_OUTPUT_LANGUAGE: OutputLanguage = "Chinese"
export const SHOW_LANGUAGE_CONTROLS = false
export const SHOW_UPDATE_AND_CHANGELOG = false
