import React from "react"
import { useAtomValue } from "jotai/utils"
import FormatColorTextIcon from "@material-ui/icons/FormatColorText"
import { IconButton, SvgIcon } from "@material-ui/core"
import { textColorAtom } from "context/AtomConfigs"
import useToolbarItemStyles from "hooks/useToolbarItemStyles"

type ColorPickerButtonProperties = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const title = "Font Color"

const ColorPickerButton = ({ onClick }: ColorPickerButtonProperties) => {
  const color = useAtomValue(textColorAtom)
  const itemClass = useToolbarItemStyles()

  return (
    <IconButton
      className={itemClass.root}
      title={title}
      aria-label={title}
      onClick={onClick}>
      <SvgIcon fontSize="small" htmlColor={color}>
        <FormatColorTextIcon />
      </SvgIcon>
    </IconButton>
  )
}

export default ColorPickerButton
