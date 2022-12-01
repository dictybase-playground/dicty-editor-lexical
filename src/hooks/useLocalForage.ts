import { useCallback } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { SerializedEditorState } from "lexical"
import { useLocation } from "react-router-dom"
import localForage from "localforage"

const useLocalForageKey = () => {
  const { pathname } = useLocation()
  return `dicty-editor${pathname}`
}

export const useSaveLocalForage = () => {
  const [editor] = useLexicalComposerContext()
  const localForageKey = useLocalForageKey()

  return useCallback(async () => {
    try {
      const editorState = editor.getEditorState()
      const editorStateJSON = editorState.toJSON()
      await localForage.setItem(localForageKey, editorStateJSON)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }, [editor, localForageKey])
}

export const useRetrieveLocalForage = () => {
  const [editor] = useLexicalComposerContext()
  const localForageKey = useLocalForageKey()

  return useCallback(async () => {
    try {
      const SerializedState = await localForage.getItem<SerializedEditorState>(
        localForageKey,
      )
      if (SerializedState) {
        const editorState = editor.parseEditorState(SerializedState)
        editor.setEditorState(editorState)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }, [editor, localForageKey])
}

export const useDeleteLocalForage = () => {
  const localForageKey = useLocalForageKey()

  return useCallback(async () => {
    try {
      await localForage.removeItem(localForageKey)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }, [localForageKey])
}
