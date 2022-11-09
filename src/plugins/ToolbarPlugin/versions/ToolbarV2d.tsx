import { useCallback, useEffect } from "react"
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useUpdateAtom } from "jotai/utils"
import { isBoldAtom, isItalicAtom, isUnderlinedAtom } from "context/AtomConfigs"
import TOGGLE_PULSE_COMMAND from "plugins/PulsePlugin/commands"
import Divider from "ui/Divider"
import {
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
  PulseButton,
} from "../components/buttons"

const LowPriority = 1

const ToolbarV2 = () => {
  const [editor] = useLexicalComposerContext()
  const setIsBold = useUpdateAtom(isBoldAtom)
  const setIsItalic = useUpdateAtom(isItalicAtom)
  const setIsUnderlined = useUpdateAtom(isUnderlinedAtom)

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
    // const unregisterTogglePulse = editor.registerCommand(
    //   TOGGLE_PULSE_COMMAND,
    //   () => {
    //     const selection = $getSelection()
    //     if ($isRangeSelection(selection)) {
    //       selection.getNodes().forEach((node) => {
    //         const { element } = node.exportDOM(editor)
    //         element?.classList.add("pulse")
    //       })
    //     }

    //     return true
    //   },
    //   1,
    // )

    return function cleanup() {
      unregisterUpdateListener()
      unregisterSelectionChangeCommand()
      //   unregisterTogglePulse()
    }
  }, [editor, updateToolbar])

  return (
    <div className="toolbar">
      <Divider />
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
      <PulseButton />
    </div>
  )
}

export default ToolbarV2
