import React, { useState, useCallback, useMemo, useEffect } from "react"
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelectionStyleValueForProperty } from "@lexical/selection"
import { $isHeadingNode } from "@lexical/rich-text"
import { $isListNode, ListNode } from "@lexical/list"
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils"
import ToolbarContext from "context/ToolbarContext"
import Divider from "ui/Divider"
import { UndoButton, RedoButton } from "../components/buttons"

const LowPriority = 1

type ToolbarBaseProperties = {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactElement | React.ReactElement[]
  // eslint-disable-next-line react/require-default-props
  defaultFontSize?: string
  // eslint-disable-next-line react/require-default-props
  defaultFontFamily?: string
}

const ToolbarV6 = ({
  children = [],
  defaultFontSize = "15px",
  defaultFontFamily = "Arial",
}: ToolbarBaseProperties) => {
  const [editor] = useLexicalComposerContext()
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [blockType, setBlockType] = useState("paragraph")
  const [fontSize, setFontSize] = useState(defaultFontSize)
  const [fontFamily, setFontFamily] = useState(defaultFontFamily)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderlined, setIsUnderlined] = useState(false)
  const contextValue = useMemo(
    () => ({
      editor,
      canUndo,
      canRedo,
      blockType,
      fontSize,
      fontFamily,
      isBold,
      isItalic,
      isUnderlined,
    }),
    [
      editor,
      canUndo,
      canRedo,
      blockType,
      fontSize,
      fontFamily,
      isBold,
      isItalic,
      isUnderlined,
    ],
  )

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow()
      const elementKey = element.getKey()
      const elementDOM = editor.getElementByKey(elementKey)

      if (elementDOM) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode,
          )
          const type = parentList
            ? parentList.getListType()
            : element.getListType()
          setBlockType(type)
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType()
          setBlockType(type)
        }
      }

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
      setFontFamily(
        $getSelectionStyleValueForProperty(
          selection,
          "font-family",
          defaultFontFamily,
        ),
      )
    }
  }, [editor, defaultFontFamily, defaultFontSize])

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

export default ToolbarV6
