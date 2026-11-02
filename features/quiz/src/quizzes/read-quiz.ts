import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { type Quiz } from '../game-core/index.ts'
import { loadQuiz } from './load-quiz.ts'

async function readQuiz(name: string): Promise<Quiz> {
    const file = path.join(import.meta.dirname, `${name}.json`)

    let text: string

    try {
        text = await readFile(file, 'utf8')
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
            throw new Error(`There is no quiz called "${name}"`, { cause: error })
        }

        throw error
    }

    return loadQuiz(text, name)
}

export default readQuiz
