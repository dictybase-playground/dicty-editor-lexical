import { useState, useRef, useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import { HexColorPicker } from "react-colorful"
import { IconButton, Menu, SvgIcon } from "@material-ui/core"
import FormatColorTextIcon from "@material-ui/icons/FormatColorText"
import { textColorAtom } from "context/AtomConfigs"
import useToolbarItemStyles from "utils/ToolBarItemStyles"
import applyStyleText from "utils/textStyles"

const ColorPickerButton = () => {
  const [editor] = useLexicalComposerContext()
  const [color, setColor] = useAtom(textColorAtom)
  const [isOpen, setIsOpen] = useState(false)
  const buttonReference = useRef(null)
  const itemClass = useToolbarItemStyles()

  useEffect(() => {
    applyStyleText(editor, { color })
  }, [editor, color])

  return (
    <>
      <IconButton
        size="small"
        ref={buttonReference}
        className={itemClass.root}
        id="color-picker"
        onClick={() => setIsOpen(!isOpen)}>
        <SvgIcon fontSize="small" htmlColor={color}>
          <FormatColorTextIcon />
        </SvgIcon>
      </IconButton>

      <Menu
        id="color-picker"
        anchorEl={buttonReference.current}
        open={isOpen}
        onClose={() => setIsOpen(false)}>
        <HexColorPicker color={color} onChange={setColor} />
      </Menu>
    </>
  )
}

export default ColorPickerButton
