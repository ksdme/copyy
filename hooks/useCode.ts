import { rword } from 'rword'

/*
  Generates a new code and returns it.
*/
export function generateCode() {
  // Generate random words for the code.
  const words = rword.generate(4) as string[]

  // Combine the words.
  return words.join(' ')
}

/*
  Return code for app from the url code.
*/
export function toCode(code: string) {
  return code.split('-').join(' ')
}
