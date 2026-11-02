import { isSavedGame, isSettings } from './guards.ts'
import type { SavedGame, Settings } from './types.ts'

export function loadSavedGame(saved: string): SavedGame {
    let value: unknown

    try {
        value = JSON.parse(saved)
    } catch {
        throw new Error('The saved game is not valid text')
    }

    if (!isSavedGame(value)) {
        throw new Error('The saved game is missing a piece or has the wrong kind of piece')
    }

    return value
}

export function loadSettings(saved: string): Settings {
    let value: unknown

    try {
        value = JSON.parse(saved)
    } catch {
        throw new Error('The saved settings are not valid text')
    }

    if (!isSettings(value)) {
        throw new Error('The saved settings need a name and, if present, a true or false hints')
    }

    return value
}
