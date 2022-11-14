import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { SELECTION_CHANGE_COMMAND } from "lexical"
import useFontProperties from "./useFontProperties"

const LowPriority = 1
const useFontPropertiesCleanup = () => {
  const updateFontProperties = useFontProperties()
  const [editor] = useLexicalComposerContext()
  /*
    1. In a useEffect callback, the returned function is called after every
    render to cleanup the side effects of the previous render.

    2. Here, the returned function is the result of calling mergeRegister,
    a function that calls each function provided to as an argument.

    3. Since the editor's registerListener and registerCommand methods return
    a function that removes the listeners they register, mergeRegister will
    return a function that cleans up the listeners registered from a
    previous render.
  */
  return useEffect(() => {
    const unregisterUpdateListener = editor.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => {
          updateFontProperties()
        })
      },
    )
    const unregisterSelectionChangeCommand = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateFontProperties()
        return false
      },
      LowPriority,
    )
    return () => {
      unregisterUpdateListener()
      unregisterSelectionChangeCommand()
    }
  }, [editor, updateFontProperties])
}

export default useFontPropertiesCleanup