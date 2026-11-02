import { loadSettings, type Settings } from '@platform/quiz/game-core'
import { readFile } from 'node:fs/promises'

export async function readSettings(file: string): Promise<Settings> {
    let text: string

    try {
        text = await readFile(file, 'utf8')
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
            throw new Error('Settings file not found', { cause: error })
        }

        throw error
    }

    return loadSettings(text)
}
