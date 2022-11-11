import { useCallback, useEffect } from "react"
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useUpdateAtom } from "jotai/utils"
import { isBoldAtom, isItalicAtom, isUnderlinedAtom } from "context/AtomConfigs"
import Divider from "components/Divider"
import useToolbarStyles from "styles/ToolbarStyles"
import {
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
} from "components"

const LowPriority = 1

const ToolbarV2 = () => {
  const [editor] = useLexicalComposerContext()
  const setIsBold = useUpdateAtom(isBoldAtom)
  const setIsItalic = useUpdateAtom(isItalicAtom)
  const setIsUnderlined = useUpdateAtom(isUnderlinedAtom)
  const toolbarClasses = useToolbarStyles()

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"))
      setIsItalic(selection.hasFormat("italic"))
      setIsUnderlined(selection.hasFormat("underline"))
    }
  }, [setIsBold, setIsItalic, setIsUnderlined])

  useEffect(() => {
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

    return function cleanup() {
      unregisterUpdateListener()
      unregisterSelectionChangeCommand()
    }
  }, [editor, updateToolbar])

  return (
    <div className={toolbarClasses.root}>
      <Divider />
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
    </div>
  )
}

export default ToolbarV2
