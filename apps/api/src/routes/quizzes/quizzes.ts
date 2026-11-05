import { type FastifyPluginAsync } from 'fastify'
import { toPrompt } from './prompt.ts'
import { findQuiz } from '#shared/quizzes'

const quizzesPlugin: FastifyPluginAsync = async (fastify) => {
    fastify.get<{
        Params: { quizName: string }
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
