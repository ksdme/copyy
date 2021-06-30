import random from 'random-words'

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
  // Generate the random words.
  const words = random({
    min: 3,
    max: 5,
  })

  // Combine the words.
  return toUrlCode(words.join('-'))
}
