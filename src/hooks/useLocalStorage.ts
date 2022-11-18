import { useCallback } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useLocation } from "react-router-dom"

const useLocalStorage = () => {
  const [editor] = useLexicalComposerContext()
  const { pathname } = useLocation()

  const saveLocalStorage = useCallback(() => {
    const editorState = editor.getEditorState()
    const editorStateString = JSON.stringify(editorState)
    localStorage.setItem(`dicty-editor-${pathname}`, editorStateString)
  }, [editor, pathname])

  const retrieveLocalStorage = useCallback(() => {
    const editorString = localStorage.getItem(`dicty-editor-${pathname}`)
    if (editorString) {
      const editorState = editor.parseEditorState(editorString)
      editor.setEditorState(editorState)
    }
  }, [editor, pathname])

  return { saveLocalStorage, retrieveLocalStorage }
}

export default useLocalStorage
