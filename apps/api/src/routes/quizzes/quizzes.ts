import type { ErrorResponse, QuizResponse } from '@platform/quiz/services'
import { type FastifyPluginAsync } from 'fastify'

import { findQuiz } from '#shared/quizzes'

import { toPrompt } from './prompt.ts'

const quizzesPlugin: FastifyPluginAsync = async (fastify) => {
    fastify.get<{
        Params: { quizName: string }
        Reply: QuizResponse | ErrorResponse
    }>('/quizzes/:quizName', async (request, reply) => {
        const quiz = await findQuiz(request.params.quizName)

        if (!quiz) {
            return reply.code(404).send({ error: 'There is no such quiz' })
        }

        return {
            prompts: quiz.questions.map(toPrompt),
            title: quiz.title,
        }
    })
}

export default quizzesPlugin
