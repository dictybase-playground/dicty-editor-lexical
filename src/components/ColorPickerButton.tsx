import React, { useState, useRef } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import FormatColorTextIcon from "@material-ui/icons/FormatColorText"
import { IconButton, SvgIcon, Popover } from "@material-ui/core"
import { HexColorPicker } from "react-colorful"
import { textColorAtom } from "context/AtomConfigs"
import useToolbarItemStyles from "hooks/useToolbarItemStyles"
import applyStyleText from "utils/textStyles"

const title = "Font Color"

const ColorPickerButton = () => {
  const [color, setColor] = useAtom(textColorAtom)
  const [editor] = useLexicalComposerContext()
  const { root } = useToolbarItemStyles()
  const [isOpen, setIsOpen] = useState(false)
  const buttonReference = useRef(null)

  const onClick = () => {
    setIsOpen(true)
  }

  const onClose = () => {
    applyStyleText(editor, { color })
    setIsOpen(false)
  }

  return (
    <>
      <IconButton
        ref={buttonReference}
        className={root}
        title={title}
        aria-label={title}
        onClick={onClick}>
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
