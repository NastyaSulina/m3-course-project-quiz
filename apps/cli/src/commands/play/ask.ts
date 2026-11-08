import { confirm, input, select } from '@inquirer/prompts'
import { type Prompt, QuestionKind, type Settings, type Submission } from '@platform/quiz/game-core'

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
            message: `${message} (${question.min} = ${question.min_label}, ${question.max} = ${question.max_label})`,
            validate: (text) => {
                const number = Number(text)

                return (
                    (text.trim() !== '' &&
                        Number.isInteger(number) &&
                        number >= question.min &&
                        number <= question.max) ||
                    `Enter a whole number from ${question.min} to ${question.max}`
                )
            },
        })

        return { kind: QuestionKind.scale, value: Number(value) }
    }

    if (question.kind === QuestionKind.yesno) {
        const value = await confirm({ message })

        return { kind: QuestionKind.yesno, value }
    }

    throw new Error('Unknown kind')
}
