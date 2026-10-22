interface Choice {
    label: string
    points: number
}

interface Question {
    text: string
    choices: Choice[]
}

const question: Question = {
    text: 'You suddenly have a free evening. What will you choose?',
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
}

const answer = 1
const picked = question.choices[answer]

console.warn(question.text)
console.warn(`You chose ${picked.label} (${picked.points} points)`)
