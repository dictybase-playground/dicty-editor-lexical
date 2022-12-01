import { useCallback } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useLocation } from "react-router-dom"

const useLocalStorageKey = () => {
  const { pathname } = useLocation()
  return `dicty-editor${pathname}`
}

export const useSaveLocalStorage = () => {
  const [editor] = useLexicalComposerContext()
  const localStorageKey = useLocalStorageKey()

  return useCallback(() => {
    const editorState = editor.getEditorState()
    const editorStateString = JSON.stringify(editorState)
    localStorage.setItem(localStorageKey, editorStateString)
  }, [editor, localStorageKey])
}

export const useRetrieveLocalStorage = () => {
  const [editor] = useLexicalComposerContext()
  const localStorageKey = useLocalStorageKey()

  return useCallback(() => {
    const editorString = localStorage.getItem(localStorageKey)
    if (editorString) {
      const editorState = editor.parseEditorState(editorString)
      editor.setEditorState(editorState)
    }
  }, [editor, localStorageKey])
}

export const useDeleteLocalStorage = () => {
  const localStorageKey = useLocalStorageKey()

  return useCallback(() => {
    localStorage.removeItem(localStorageKey)
  }, [localStorageKey])
}
