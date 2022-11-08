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
  fontFamilyAtom,
  FontFamily,
} from "context/AtomConfigs"
import FontSizeDropdown from "plugins/ToolbarPlugin/components/FontSizeDropdown"
import FontFamilyDropdown from "plugins/ToolbarPlugin/components/FontFamilyDropdown"
import AlignDropdown from "plugins/ToolbarPlugin/components/AlignDropdown"
import Divider from "ui/Divider"
import {
  UndoButton,
  RedoButton,
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
} from "plugins/ToolbarPlugin/components/buttons"
import "../ToolbarPlugin.css"

const LowPriority = 1

type ToolbarBaseProperties = {
  defaultFontSize?: string
  defaultFontFamily?: string
}

const ToolbarV5 = ({
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
      setFontFamily(
        $getSelectionStyleValueForProperty(
          selection,
          "font-family",
          defaultFontFamily,
        ) as FontFamily,
      )
    }
  }, [
    defaultFontFamily,
    defaultFontSize,
    setFontFamily,
    setFontSize,
    setIsBold,
    setIsItalic,
    setIsUnderlined,
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
      <FontSizeDropdown />
      <FontFamilyDropdown />
      <Divider />
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
      <AlignDropdown />
    </div>
  )
}

export default ToolbarV5
