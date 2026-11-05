import { confirm, input, select } from '@inquirer/prompts'
import { QuestionKind, type Prompt, type Settings, type Submission } from '@platform/quiz/game-core'

export async function ask(settings: Settings, question: Prompt): Promise<Submission> {
    const hint = question.hint && settings.hints ? `\nHint: ${question.hint}` : ''
    const message = `${question.text}${hint}`

    if (question.kind === QuestionKind.choice) {
        const picked = await select({
            message,
            choices: question.choices.map((choice) => ({
                name: choice.label,
                value: choice,
            })),
        })

        return { kind: QuestionKind.choice, picked }
    }

    if (question.kind === QuestionKind.scale) {
        const value = await input({
            message: `${message} (0 = ${question.low}, 2 = ${question.high})`,
            validate: (text) =>
                ['0', '1', '2'].includes(text.trim()) ? true : 'Enter a whole number from 0 to 2',
        })

        return { kind: QuestionKind.scale, value: Number(value) }
    }

    if (question.kind === QuestionKind.yesno) {
        const value = await confirm({ message })

        return { kind: QuestionKind.yesno, value }
    }

    throw new Error('Unknown kind')
}
