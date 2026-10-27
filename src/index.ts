import { outcomes, questions, QUIZ_TITLE } from './data.ts'
import { recap, show } from './quiz.ts'
import { Session } from './session.ts'
import { OutcomeId, QuestionKind, type Answer } from './types.ts'

const answers: Answer[] = [
    {
        kind: QuestionKind.choice,
        picked: {
            label: 'have a chat with my best friend',
            outcome: OutcomeId.comfort,
            points: 2,
        },
    },
    {
        kind: QuestionKind.choice,
        picked: { label: 'matcha', outcome: OutcomeId.underground, points: 2 },
    },
    { kind: QuestionKind.yesno, value: false },
    { kind: QuestionKind.yesno, value: true },
    { kind: QuestionKind.scale, value: 1 },
    { kind: QuestionKind.yesno, value: true },
    {
        kind: QuestionKind.choice,
        picked: {
            label: 'only if the camera is better',
            outcome: OutcomeId.hit,
            points: 2,
        },
    },
]

console.log(`\n${QUIZ_TITLE}`)

const session = new Session(outcomes)
session.start()

for (const [index, question] of questions.entries()) {
    const answer = answers[index]

    console.log(`\nQuestion ${index + 1}/${questions.length}`)
    console.log(show(question))

    const { outcome, points } = session.record(question, answer)

    console.log(`Answer worth ${points} ${points === 1 ? 'point' : 'points'} for ${outcome}`)
}

session.finish()
const result = session.result()

console.log('\nYour answers:\n')

for (const [index, question] of questions.entries()) {
    console.log(`${index + 1}. ${recap(question, answers[index])}`)
}

console.log(`\nYou are: ${result.title}`)
console.log(result.description)
