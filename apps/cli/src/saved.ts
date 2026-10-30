import { type Answer, QuestionKind } from '@platform/quiz/core'

const initialAnswers: Answer[] = [
    {
        kind: QuestionKind.choice,
        picked: {
            label: 'have a chat with my best friend',
            outcome: 'comfort',
            points: 2,
        },
    },
    {
        kind: QuestionKind.choice,
        picked: { label: 'matcha', outcome: 'underground', points: 2 },
    },
    { kind: QuestionKind.yesno, value: false },
    { kind: QuestionKind.yesno, value: true },
    { kind: QuestionKind.scale, value: 1 },
    { kind: QuestionKind.yesno, value: true },
    {
        kind: QuestionKind.choice,
        picked: {
            label: 'only if the camera is better',
            outcome: 'hit',
            points: 2,
        },
    },
]

export const savedGame = JSON.stringify({
    answers: initialAnswers,
    startedAt: new Date(),
})

export const savedSettings = JSON.stringify({
    name: 'Anastasiia',
    hints: true,
})
