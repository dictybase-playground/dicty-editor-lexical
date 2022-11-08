import { useCallback, useEffect } from "react"
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import { isBoldAtom, isItalicAtom, isUnderlinedAtom } from "context/AtomConfigs"
import Divider from "ui/Divider"
import {
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
} from "../components/buttons"

const LowPriority = 1

const ToolbarV2 = () => {
  const [editor] = useLexicalComposerContext()
  const [, setIsBold] = useAtom(isBoldAtom)
  const [, setIsItalic] = useAtom(isItalicAtom)
  const [, setIsUnderlined] = useAtom(isUnderlinedAtom)

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
    <div className="toolbar">
      <Divider />
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
    </div>
  )
}

export default ToolbarV2
