import { useState, useRef } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import FormatColorTextIcon from "@material-ui/icons/FormatColorText"
import { IconButton, SvgIcon, Popover } from "@material-ui/core"
import { HexColorPicker } from "react-colorful"
import useToolbarItemStyles from "hooks/useToolbarItemStyles"
import useToggle from "hooks/useToogle"
import applyStyleText from "utils/textStyles"

const title = "Font Color"
const defaultColor = "#000000"

const ColorPickerButton = () => {
  const [color, setColor] = useState(defaultColor)
  const [isOpen, toggleOpen, setValue] = useToggle()
  const [editor] = useLexicalComposerContext()
  const classes = useToolbarItemStyles()
  const buttonReference = useRef(null)

  const onClose = () => {
    applyStyleText(editor, { color })
    setValue(false)
  }

  return (
    <>
      <IconButton
        ref={buttonReference}
        className={classes.root}
        title={title}
        aria-label={title}
        onClick={toggleOpen}>
        <SvgIcon fontSize="small" htmlColor={color}>
          <FormatColorTextIcon />
        </SvgIcon>
      </IconButton>
      <Popover
        open={isOpen}
        anchorEl={buttonReference.current}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}>
        <HexColorPicker color={color} onChange={setColor} />
      </Popover>
    </>
  )
}

export default ColorPickerButton
