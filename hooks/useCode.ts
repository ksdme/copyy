import random from 'random'
import words from '../data/words'

/*
  Return code for app from the url code.
*/
export function toDisplayCode(code: string) {
  return code.split('-').join(' ')
}

/*
  Return the code that is url friendly.
*/
export function toUrlCode(code: string) {
  return code
    .split(' ')
    .join('-')
}

/*
  Generates a new code and returns it.
*/
export function generateCode() {
  // The number of words in the code.
  const count = random.integer(3, 5)

  // Words in the code.
  const code = []

  // Pick a word from the wordlist at random.
  for (let index = 0; index < count; index++) {
    code.push(words[random.integer(0, words.length - 1)])
  }

  // Combine the words.
  return toUrlCode(code.join('-'))
}
