import { program } from 'commander'
import play from './commands/play/index.ts'

program.name('quiz').description('Take a quiz in the terminal')

program
    .command('play')
    .description('Take a quiz in the terminal')
    .argument('[quiz]', 'the quiz to play', 'playlist')
    .option('-n, --name <name>', 'Your name')
    .action(play)

try {
    await program.parseAsync()
} catch (error) {
    if (error instanceof Error && error.name === 'ExitPromptError') {
        process.exitCode = 130
    } else {
        console.error(error instanceof Error ? error.message : error)
        process.exitCode = 1
    }
}
