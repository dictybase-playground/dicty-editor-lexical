import React, { useState } from "react"
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
      <IconButton
        className={root}
        title={title}
        aria-label={title}
        onClick={onClick}>
        <SvgIcon fontSize="small" htmlColor={color}>
          <FormatColorTextIcon />
        </SvgIcon>
      </IconButton>
      <Popover
        open={!!anchorElement}
        anchorEl={anchorElement}
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
