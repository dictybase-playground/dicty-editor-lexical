import React, { useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtomValue } from "jotai/utils"
import { textColorAtom } from "context/AtomConfigs"
import applyStyleText from "utils/textStyles"
import ColorPickerButton from "./ColorPickerButton"
import ColorPickerPopover from "./ColorPickerPopover"

const ColorPicker = () => {
  const color = useAtomValue(textColorAtom)
  const [editor] = useLexicalComposerContext()
  const [anchorElement, setAnchorElement] = useState<HTMLElement | undefined>(
    undefined,
  )

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget)
  }

  const onClose = () => {
    applyStyleText(editor, { color })
    setAnchorElement(undefined)
  }

  return (
    <>
      <ColorPickerButton onClick={onClick} />
      <ColorPickerPopover
        open={!!anchorElement}
        anchorElement={anchorElement}
        onClose={onClose}
      />
    </>
  )
}

export default ColorPicker
