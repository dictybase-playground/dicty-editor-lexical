import { useCallback } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useLocation } from "react-router-dom"

const useLocalStorage = () => {
  const [editor] = useLexicalComposerContext()
  const { pathname } = useLocation()
  const localStorageKey = `dicty-editor${pathname}`

  const saveLocalStorage = useCallback(() => {
    const editorState = editor.getEditorState()
    const editorStateString = JSON.stringify(editorState)
    localStorage.setItem(localStorageKey, editorStateString)
  }, [editor, localStorageKey])

  const retrieveLocalStorage = useCallback(() => {
    const editorString = localStorage.getItem(localStorageKey)
    if (editorString) {
      const editorState = editor.parseEditorState(editorString)
      editor.setEditorState(editorState)
    }
  }, [editor, localStorageKey])

  const deleteLocalStorage = useCallback(() => {
    localStorage.removeItem(localStorageKey)
  }, [localStorageKey])

  return { saveLocalStorage, retrieveLocalStorage, deleteLocalStorage }
}

export default useLocalStorage
