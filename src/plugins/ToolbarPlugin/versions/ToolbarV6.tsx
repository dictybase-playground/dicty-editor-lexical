import { useCallback, useEffect } from "react"
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
import { $getNearestNodeOfType } from "@lexical/utils"
import { useAtom } from "jotai"
import {
  canUndoAtom,
  canRedoAtom,
  isBoldAtom,
  isItalicAtom,
  isUnderlinedAtom,
  fontSizeAtom,
  fontFamilyAtom,
  FontFamily,
  blockTypesAtom,
} from "context/AtomConfigs"
import FontSizeDropdown from "plugins/ToolbarPlugin/components/FontSizeDropdown"
import FontFamilyDropdown from "plugins/ToolbarPlugin/components/FontFamilyDropdown"
import AlignDropdown from "plugins/ToolbarPlugin/components/AlignDropdown"
import InsertDropdown from "plugins/ToolbarPlugin/components/InsertDropdown/InsertDropdownV1"
import BlockFormatDropdown from "plugins/ToolbarPlugin/components/BlockFormatDropdown"
import {
  UndoButton,
  RedoButton,
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
} from "plugins/ToolbarPlugin/components/buttons"
import Divider from "ui/Divider"

const LowPriority = 1

type ToolbarBaseProperties = {
  defaultFontSize?: string
  defaultFontFamily?: string
}

const ToolbarV6 = ({
  defaultFontSize = "15px",
  defaultFontFamily = "Arial",
}: ToolbarBaseProperties) => {
  const [editor] = useLexicalComposerContext()
  const [, setCanUndo] = useAtom(canUndoAtom)
  const [, setCanRedo] = useAtom(canRedoAtom)
  const [, setIsBold] = useAtom(isBoldAtom)
  const [, setIsItalic] = useAtom(isItalicAtom)
  const [, setIsUnderlined] = useAtom(isUnderlinedAtom)
  const [, setFontSize] = useAtom(fontSizeAtom)
  const [, setFontFamily] = useAtom(fontFamilyAtom)
  const [, setBlockType] = useAtom(blockTypesAtom)

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
        ) as FontFamily,
      )
    }
  }, [
    editor,
    setIsBold,
    setIsItalic,
    setIsUnderlined,
    setFontSize,
    defaultFontSize,
    setFontFamily,
    defaultFontFamily,
    setBlockType,
  ])

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
      <BlockFormatDropdown />
      <FontSizeDropdown />
      <FontFamilyDropdown />
      <Divider />
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
      <Divider />
      <AlignDropdown />
      <Divider />
      <InsertDropdown />
    </div>
  )
}

export default ToolbarV6
