import { QuestionKind, type Outcome, type Question } from './types.ts'

export const QUIZ_TITLE = 'Which song in the playlist are you?'

export const questions: Question[] = [
    {
        text: 'You suddenly have a free evening. What will you choose?',
        kind: QuestionKind.choice,
        choices: [
            {
                label: 'stay home and watch my favorite show',
                points: 0,
            },
            {
                label: 'hang out and gossip with my best friend',
                points: 1,
            },
            {
                label: 'find somewhere fun to go',
                points: 2,
            },
            {
                label: 'create a group chat and get everyone together to go out somewhere this evening',
                points: 3,
            },
        ],
    },
    {
        text: 'What drink are you going for?',
        kind: QuestionKind.choice,
        choices: [
            {
                label: 'matcha',
                points: 0,
            },
            {
                label: 'latte/cappuccino',
                points: 1,
            },
            {
                label: 'Coca-Cola',
                points: 2,
            },
            {
                label: 'milkshake',
                points: 3,
            },
        ],
    },
    {
        text: 'Do you have a favorite mug that no one else is allowed to use?',
        kind: QuestionKind.yesno,
    },
    {
        text: 'Would you go to the cinema alone?',
        kind: QuestionKind.yesno,
    },
    {
        text: 'How comfortable do you feel dining alone at a restaurant?',
        kind: QuestionKind.scale,
        low: 'very uncomfortable',
        high: 'very comfortable',
    },
]

export const outcomes: Outcome[] = [
    {
        title: 'underground banger',
        description:
            'Not everyone understands you, and that is perfectly fine. You are a hidden gem with a small but loyal fanbase who absolutely love you!',
    },
    {
        title: 'comfort song',
        description:
            'A song for any mood. You could listen to it a hundred times over, and it would never get old...',
    },
    {
        title: 'the hit',
        description:
            'Everyone loves you. From rap fans to rock fans, you just get along with everyone',
    },
    {
        title: 'party anthem',
        description:
            'You get everyone dancing, even those who can barely stand. You are at every party, and everyone knows the words!',
    },
]
