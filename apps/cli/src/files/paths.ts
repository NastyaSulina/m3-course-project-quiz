import path from 'node:path'

export function locateSettings(): string {
    return path.join(import.meta.dirname, '..', '..', 'data', 'settings.json')
}

export function locateSavedGame(): string {
    return path.join(import.meta.dirname, '..', '..', 'data', 'game.json')
}
