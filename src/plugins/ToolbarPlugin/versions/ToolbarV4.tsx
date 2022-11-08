import { useCallback, useEffect } from "react"
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
} from "lexical"
import { $getSelectionStyleValueForProperty } from "@lexical/selection"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import {
  canUndoAtom,
  canRedoAtom,
  isBoldAtom,
  isItalicAtom,
  isUnderlinedAtom,
  fontSizeAtom,
} from "context/AtomConfigs"
import Divider from "ui/Divider"
import FontSizeDropdown from "plugins/ToolbarPlugin/components/FontSizeDropdown"
import {
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
  UndoButton,
  RedoButton,
} from "plugins/ToolbarPlugin/components/buttons"

const LowPriority = 1

type ToolbarBaseProperties = {
  defaultFontSize?: string
}

const ToolbarV4 = ({ defaultFontSize = "15px" }: ToolbarBaseProperties) => {
  const [editor] = useLexicalComposerContext()
  const [, setCanUndo] = useAtom(canUndoAtom)
  const [, setCanRedo] = useAtom(canRedoAtom)
  const [, setIsBold] = useAtom(isBoldAtom)
  const [, setIsItalic] = useAtom(isItalicAtom)
  const [, setIsUnderlined] = useAtom(isUnderlinedAtom)
  const [, setFontSize] = useAtom(fontSizeAtom)

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"))
      setIsItalic(selection.hasFormat("italic"))
      setIsUnderlined(selection.hasFormat("underline"))
      setFontSize(
        $getSelectionStyleValueForProperty(
          selection,
          "font-size",
          defaultFontSize,
        ),
      )
    }
  }, [defaultFontSize, setFontSize, setIsBold, setIsItalic, setIsUnderlined])

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
    const unregisterCanUndoCommand = editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload)
        return false
      },
      LowPriority,
    )
    const unregisterCanRedoCommand = editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload)
        return false
      },
      LowPriority,
    )

    return function cleanup() {
      unregisterUpdateListener()
      unregisterSelectionChangeCommand()
      unregisterCanUndoCommand()
      unregisterCanRedoCommand()
    }
  }, [editor, setCanRedo, setCanUndo, updateToolbar])

  return (
    <div className="toolbar">
      <UndoButton />
      <RedoButton />
      <Divider />
      <FontSizeDropdown />
      <Divider />
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
    </div>
  )
}

export default ToolbarV4
