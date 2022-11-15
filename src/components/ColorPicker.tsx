import { useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import { HexColorPicker } from "react-colorful"
import { ClickAwayListener, makeStyles } from "@material-ui/core"
import { textColorAtom } from "context/AtomConfigs"
import applyStyleText from "utils/textStyles"
import useColorPickerStyles from "utils/ColorPickerStyles"
import ColorPickerButton from "./ColorPickerButton"

const ColorPicker = () => {
  const [editor] = useLexicalComposerContext()
  const [color, setColor] = useAtom(textColorAtom)
  const [isOpen, setIsOpen] = useState(false)
  const { root } = useColorPickerStyles()

  const onClose = () => {
    if (!isOpen) return
    applyStyleText(editor, { color })
    setIsOpen(false)
  }

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={onClose}>
      <div style={{ position: "relative" }}>
        <ColorPickerButton onClick={() => setIsOpen(!isOpen)} />
        {isOpen && (
          <div className={root}>
            <HexColorPicker color={color} onChange={setColor} />
          </div>
        )}
      </div>
    </ClickAwayListener>
  )
}

export default ColorPicker