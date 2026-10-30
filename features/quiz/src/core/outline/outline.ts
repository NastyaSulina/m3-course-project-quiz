import { QuestionKind, type Quiz } from '../types.ts'

function outline(quiz: Quiz): string {
    const { questions } = quiz
    const lines: string[] = []

    for (const [index, question] of questions.entries()) {
        if (question.kind === QuestionKind.choice) {
            lines.push(
                `${index + 1}. ${question.text} (choice, ${question.choices.length} options)`,
            )
            continue
        }

        if (question.kind === QuestionKind.scale) {
            lines.push(`${index + 1}. ${question.text} (scale)`)
            continue
        }

        if (question.kind === QuestionKind.yesno) {
            lines.push(`${index + 1}. ${question.text} (yes or no)`)
            continue
        }

        throw new Error('Unknown kind')
    }

    return lines.join('\n')
}

export function countKinds(quiz: Quiz): Record<QuestionKind, number> {
    const counts: Record<QuestionKind, number> = {
        [QuestionKind.choice]: 0,
        [QuestionKind.scale]: 0,
        [QuestionKind.yesno]: 0,
    }

    for (const question of quiz.questions) {
        if (!Object.values(QuestionKind).some((kind) => kind === question.kind)) {
            throw new Error('Unknown kind')
        }

        counts[question.kind]++
    }

    return counts
}

export default outline
