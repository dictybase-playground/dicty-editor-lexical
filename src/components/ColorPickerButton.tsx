import React from "react"
import { useAtomValue } from "jotai/utils"
import FormatColorTextIcon from "@material-ui/icons/FormatColorText"
import { IconButton, SvgIcon, Tooltip } from "@material-ui/core"
import { textColorAtom } from "context/AtomConfigs"
import useToolbarItemStyles from "utils/ToolBarItemStyles"

type ColorPickerButtonProperties = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const ColorPickerButton = ({ onClick }: ColorPickerButtonProperties) => {
  const color = useAtomValue(textColorAtom)
  const itemClass = useToolbarItemStyles()
  return (
    <Tooltip arrow title="Font Color">
      <IconButton
        size="small"
        className={itemClass.root}
        aria-label="color-picker"
        onClick={onClick}>
        <SvgIcon fontSize="small" htmlColor={color}>
          <FormatColorTextIcon />
        </SvgIcon>
      </IconButton>
    </Tooltip>
  )
}

export default ColorPickerButton
