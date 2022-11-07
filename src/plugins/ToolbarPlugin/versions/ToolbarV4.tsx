import React, { useCallback, useEffect } from "react"
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
} from "lexical"
import { $getSelectionStyleValueForProperty } from "@lexical/selection"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { mergeRegister } from "@lexical/utils"
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
import { UndoButton, RedoButton } from "../components/buttons"

const LowPriority = 1

type ToolbarBaseProperties = {
  children?: React.ReactElement | React.ReactElement[]
  defaultFontSize?: string
}

const ToolbarV4 = ({
  children = [],
  defaultFontSize = "15px",
}: ToolbarBaseProperties) => {
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

  useEffect(
    () =>
      mergeRegister(
        editor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            updateToolbar()
          })
        }),
        editor.registerCommand(
          SELECTION_CHANGE_COMMAND,
          () => {
            updateToolbar()
            return false
          },
          LowPriority,
        ),
        editor.registerCommand(
          CAN_UNDO_COMMAND,
          (payload) => {
            setCanUndo(payload)
            return false
          },
          LowPriority,
        ),
        editor.registerCommand(
          CAN_REDO_COMMAND,
          (payload) => {
            setCanRedo(payload)
            return false
          },
          LowPriority,
        ),
      ),
    [editor, setCanRedo, setCanUndo, updateToolbar],
  )

  return (
    <div className="toolbar">
      <UndoButton />
      <RedoButton />
      <Divider />
      {children}
    </div>
  )
}

export default ToolbarV4
