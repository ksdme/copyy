import uniq from 'lodash.uniq'
import debounce from 'lodash.debounce'
import { RefObject, useState } from 'react'
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
export default function useContentEditable(ref: RefObject<HTMLElement>, callback?: ((text: string) => void)) {
  const [
    content,
    setContent,
  ] = useState<string>(null)

  // Method that can be used to update the content on the field.
  const updateEditableContent = (text: string) => {
    if (!ref.current) {
      return
    }

    // Transform the text to html.
    const html = getStyledContent(text)
    ref.current.innerHTML = html

    // Unfocus the field to work around the misplaced caret after
    // updating the content.
    ref.current.blur()

    // Remember the current content.
    setContent(text)
  }

  /*
    Handler that is called when the input event is fired on the
    field.
  */
  const onInputHandler = () => {
    // Input text on the editable field.
    const text = ref?.current?.innerText

    if (!text) {
      return
    }

    // Invoke the callback.
    if (callback) {
      callback(text)
    }

    // Update content on the editable.
    updateEditableContent(text)
  }

  // Debounced handler.
  const onInput = debounce(
    onInputHandler,
    1000,
  )

  return {
    content,
    onInput,
    updateEditableContent,
  }
}
