import { useState, useRef, useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import { HexColorPicker } from "react-colorful"
import {
  IconButton,
  ClickAwayListener,
  SvgIcon,
  makeStyles,
} from "@material-ui/core"
import FormatColorTextIcon from "@material-ui/icons/FormatColorText"
import { textColorAtom } from "context/AtomConfigs"
import useToolbarItemStyles from "utils/ToolBarItemStyles"
import applyStyleText from "utils/textStyles"

const useStyles = makeStyles({
  root: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    width: "min-content",
    top: 30,

    zIndex: 1,
  },
})

const ColorPickerButton = () => {
  const [editor] = useLexicalComposerContext()
  const [color, setColor] = useAtom(textColorAtom)
  const [isOpen, setIsOpen] = useState(false)
  const itemClass = useToolbarItemStyles()
  const { dropdown } = useStyles()

  const onClose = () => {
    applyStyleText(editor, { color })
    setIsOpen(false)
  }

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={onClose}>
      <div style={{ position: "relative" }}>
        <IconButton
          size="small"
          className={itemClass.root}
          aria-controls="color-picker"
          onClick={() => setIsOpen(!isOpen)}>
          <SvgIcon fontSize="small" htmlColor={color}>
            <FormatColorTextIcon />
          </SvgIcon>
        </IconButton>
        {isOpen && (
          <div className={dropdown}>
            <HexColorPicker color={color} onChange={setColor} />
          </div>
        )}
      </div>
    </ClickAwayListener>
  )
}

export default ColorPickerButton
