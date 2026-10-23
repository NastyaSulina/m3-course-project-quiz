import { questions, QUIZ_TITLE } from './data.ts'
import { award, recap, show } from './quiz.ts'
import { QuestionKind, type Answer } from './types.ts'

const answers: Answer[] = [
    {
        kind: QuestionKind.choice,
        picked: { label: 'hang out and gossip with my best friend', points: 1 },
    },
    { kind: QuestionKind.choice, picked: { label: 'matcha', points: 0 } },
    { kind: QuestionKind.yesno, value: true },
    { kind: QuestionKind.scale, value: 2 },
    { kind: QuestionKind.scale, value: 1 },
]

console.log(`\n${QUIZ_TITLE}`)

let total = 0

for (const [index, question] of questions.entries()) {
    const answer = answers[index]

    const points = award(answer)
    total += points

    console.log(`\nQuestion ${index + 1}/${questions.length}`)
    console.log(show(question))
    console.log(`Answer worth ${points} ${points === 1 ? 'point' : 'points'}`)
}

console.log(`\nTotal score: ${total}`)

console.log('\nYour answers:\n')

for (const [index, question] of questions.entries()) {
    console.log(`${index + 1}. ${recap(question, answers[index])}`)
}
