import uniq from 'lodash.uniq'
import debounce from 'lodash.debounce'
import { RefObject, useEffect, useRef, useState } from 'react'
import url from 'url-regex'

/*
  Build an anchor tag for the link.
*/
const linkTag = (link: string) => {
  return `<a href="${link}" class="text-blue-600" contenteditable="false">${link}</a>`
}

/*
  Transform the text passed and build styled content. For
  example, transform links into anchor tags.
*/
export function getStyledContent(text: string) {
  const matches = uniq(
    text.match(url()),
  )

  // Update the links.
  for (const match of matches) {
    text = text.replaceAll(match, linkTag(match))
  }

  return text
}

/*
  Hook that allows to transform the content of the contenteditable and also
  keep track of the content in the field.
*/
export default function useContentEditable(ref: RefObject<HTMLElement>) {
  const [
    content,
    setContent,
  ] = useState<string>(null)

  useEffect(() => {
    if (ref.current) {
      const onInput = () => {
        // Get the transform the text.
        const text = ref.current.innerText
        const html = getStyledContent(text)

        // Update the field and the state.
        ref.current.innerHTML = html
        ref.current.blur()
        setContent(text)
      }

      // Debounce call to the handler.
      ref.current.addEventListener('input', debounce(
        onInput,
        1000,
      ))
    }
  }, [
    ref.current,
  ])

  return [
    content,
  ]
}
