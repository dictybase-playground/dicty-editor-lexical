import React, { useState, useCallback, useMemo, useEffect } from "react"
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
import ToolbarContext from "context/ToolbarContext"
import Divider from "ui/Divider"
import { UndoButton, RedoButton } from "../components/buttons"

const LowPriority = 1

type ToolbarBaseProperties = {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactElement | React.ReactElement[]
  // eslint-disable-next-line react/require-default-props
  defaultFontSize?: string
}

const ToolbarV4 = ({
  children = [],
  defaultFontSize = "15px",
}: ToolbarBaseProperties) => {
  const [editor] = useLexicalComposerContext()
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [fontSize, setFontSize] = useState(defaultFontSize)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderlined, setIsUnderlined] = useState(false)
  const contextValue = useMemo(
    () => ({
      editor,
      canUndo,
      canRedo,
      fontSize,
      isBold,
      isItalic,
      isUnderlined,
    }),
    [editor, canUndo, canRedo, fontSize, isBold, isItalic, isUnderlined],
  )

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
  }, [defaultFontSize])

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
    [editor, updateToolbar],
  )

  return (
    <ToolbarContext.Provider value={contextValue}>
      <div className="toolbar">
        <UndoButton />
        <RedoButton />
        <Divider />
        {children}
      </div>
    </ToolbarContext.Provider>
  )
}

export default ToolbarV4
