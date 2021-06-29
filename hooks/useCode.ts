import { rword } from 'rword'

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
  // Generate random words for the code.
  const words = rword.generate(4) as string[]

  // Combine the words.
  return toUrlCode(words.join())
}
