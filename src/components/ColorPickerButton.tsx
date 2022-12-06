import React, { useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtomValue } from "jotai/utils"
import FormatColorTextIcon from "@material-ui/icons/FormatColorText"
import { IconButton, SvgIcon } from "@material-ui/core"
import { textColorAtom } from "context/AtomConfigs"
import useToolbarItemStyles from "hooks/useToolbarItemStyles"
import applyStyleText from "utils/textStyles"
import ColorPickerPopover from "./ColorPickerPopover"

const title = "Font Color"

const ColorPickerButton = () => {
  const color = useAtomValue(textColorAtom)
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
      <ColorPickerPopover
        open={!!anchorElement}
        anchorElement={anchorElement}
        onClose={onClose}
      />
    </>
  )
}

export default ColorPickerButton
