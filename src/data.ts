import { OutcomeId, QuestionKind, type Outcome, type Question } from './types.ts'

export const QUIZ_TITLE = 'Which song in the playlist are you?'

export const questions: Question[] = [
    {
        text: 'You suddenly have a free evening. What do you do?',
        kind: QuestionKind.choice,
        choices: [
            {
                label: 'watch a weird movie that no one has heard of',
                outcome: OutcomeId.underground,
                points: 2,
            },
            {
                label: 'have a chat with my best friend',
                outcome: OutcomeId.comfort,
                points: 2,
            },
            {
                label: 'find somewhere fun to go',
                outcome: OutcomeId.hit,
                points: 2,
            },
            {
                label: 'get all my friends together for a night out',
                outcome: OutcomeId.party,
                points: 2,
            },
        ],
    },
    {
        text: 'What drink are you going for?',
        kind: QuestionKind.choice,
        choices: [
            {
                label: 'matcha',
                outcome: OutcomeId.underground,
                points: 2,
            },
            {
                label: 'latte/cappuccino',
                outcome: OutcomeId.comfort,
                points: 2,
            },
            {
                label: 'Coca-Cola',
                outcome: OutcomeId.hit,
                points: 2,
            },
            {
                label: 'milkshake',
                outcome: OutcomeId.party,
                points: 2,
            },
        ],
    },
    {
        text: 'Are you usually the loudest person in the room?',
        kind: QuestionKind.yesno,
        outcome: OutcomeId.party,
    },
    {
        text: 'Do you still rewatch the TV shows you loved as a child?',
        kind: QuestionKind.yesno,
        outcome: OutcomeId.comfort,
    },
    {
        text: 'How often do you buy something after seeing it on TikTok?',
        kind: QuestionKind.scale,
        low: 'never',
        high: 'all the time',
        outcome: OutcomeId.hit,
    },
    {
        text: 'Would you say you have great taste in movies?',
        kind: QuestionKind.yesno,
        outcome: OutcomeId.underground,
    },
    {
        text: 'How badly do you need a new iPhone?',
        kind: QuestionKind.choice,
        choices: [
            {
                label: 'my old phone has character',
                outcome: OutcomeId.underground,
                points: 2,
            },
            {
                label: 'I am used to my phone',
                outcome: OutcomeId.comfort,
                points: 2,
            },
            {
                label: 'only if the camera is better',
                outcome: OutcomeId.hit,
                points: 2,
            },
            {
                label: 'I have already pre-ordered it',
                outcome: OutcomeId.party,
                points: 2,
            },
        ],
    },
]

export const outcomes: Outcome[] = [
    {
        id: OutcomeId.underground,
        title: 'underground banger',
        description:
            'Not everyone understands you, and that is perfectly fine. You are a hidden gem with a small but loyal fanbase who absolutely love you!',
    },
    {
        id: OutcomeId.comfort,
        title: 'comfort song',
        description:
            'A song for any mood. You could listen to it a hundred times over, and it would never get old...',
    },
    {
        id: OutcomeId.hit,
        title: 'the hit',
        description:
            'Everyone loves you. From rap fans to rock fans, you just get along with everyone',
    },
    {
        id: OutcomeId.party,
        title: 'party anthem',
        description:
            'You get everyone dancing, even those who can barely stand. You are at every party, and everyone knows the words!',
    },
]
