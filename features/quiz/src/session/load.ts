import { isAnswer, type SavedGame, type Settings } from '../quiz-core/index.ts'

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

export function isSettings(value: unknown): value is Settings {
    if (typeof value !== 'object' || value === null) {
        return false
    }

    if (!('name' in value) || typeof value.name !== 'string') {
        return false
    }

    if ('hints' in value && typeof value.hints !== 'boolean') {
        return false
    }

    return true
}

export function isSavedGame(value: unknown): value is SavedGame {
    if (typeof value !== 'object' || value === null) {
        return false
    }

    if (!('answers' in value) || !Array.isArray(value.answers) || !value.answers.every(isAnswer)) {
        return false
    }

    if ('startedAt' in value && typeof value.startedAt !== 'string') {
        return false
    }

    return true
}
