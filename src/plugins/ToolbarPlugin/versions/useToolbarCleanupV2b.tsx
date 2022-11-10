import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { SELECTION_CHANGE_COMMAND } from "lexical"
import useUpdateToolbar from "./useUpdateToolbar2b"

const LowPriority = 1
const useToolbarCleanup = () => {
  const updateToolbar = useUpdateToolbar()
  const [editor] = useLexicalComposerContext()
  return useEffect(() => {
    const unregisterUpdateListener = editor.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      },
    )
    const unregisterSelectionChangeCommand = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar()
        return false
      },
      LowPriority,
    )
    return () => {
      unregisterUpdateListener()
      unregisterSelectionChangeCommand()
    }
  }, [editor, updateToolbar])
}

export default useToolbarCleanup
