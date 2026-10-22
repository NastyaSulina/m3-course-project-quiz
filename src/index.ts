import { questions, QUIZ_TITLE } from './data.ts'
import { show } from './quiz.ts'

console.log(QUIZ_TITLE)

for (const question of questions) {
    console.log(show(question))
}
