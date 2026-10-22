interface Choice {
    label: string
    points: number
}

interface Question {
    text: string
    choices: Choice[]
}
interface Outcome {
    title: string
    description: string
}

const quizTitle = 'Which song in the playlist are you?'

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

const outcome: Outcome = {
    title: 'comfort song',
    description:
        'A song for any mood. You could listen to it a hundred times over, and it would never get old...',
}

const answer = 1
const picked = question.choices[answer]

console.log(`Welcome to the quiz: ${quizTitle}\n`)

console.log(question.text)
console.log(`You chose "${picked.label}" (${picked.points} points)\n`)

console.log('Your results are ready!')
console.log(`You are a ${outcome.title}`)
console.log(`Description: ${outcome.description}`)
