import { useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import { HexColorPicker } from "react-colorful"
import { ClickAwayListener, makeStyles } from "@material-ui/core"
import { textColorAtom } from "context/AtomConfigs"
import applyStyleText from "utils/textStyles"
import ColorPickerButton from "./ColorPickerButton"

const useStyles = makeStyles({
  dropdown: {
    position: "absolute",
    width: "min-content",
    top: 30,
    zIndex: 1,
    borderRadius: "8px",
    boxShadow:
      "0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
  },
})

const ColorPicker = () => {
  const [editor] = useLexicalComposerContext()
  const [color, setColor] = useAtom(textColorAtom)
  const [isOpen, setIsOpen] = useState(false)
  const { dropdown } = useStyles()

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
          <div className={dropdown}>
            <HexColorPicker color={color} onChange={setColor} />
          </div>
        )}
      </div>
    </ClickAwayListener>
  )
}

export default ColorPicker
