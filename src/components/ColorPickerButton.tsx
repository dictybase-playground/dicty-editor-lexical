import React from "react"
import { useAtomValue } from "jotai/utils"
import FormatColorTextIcon from "@material-ui/icons/FormatColorText"
import { SvgIcon } from "@material-ui/core"
import { textColorAtom } from "context/AtomConfigs"
import useToolbarItemStyles from "utils/ToolBarItemStyles"
import TooltipButton from "./TooltipButton"

type ColorPickerButtonProperties = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const ColorPickerButton = ({ onClick }: ColorPickerButtonProperties) => {
  const color = useAtomValue(textColorAtom)
  const itemClass = useToolbarItemStyles()
  return (
    <TooltipButton
      title="Font Color"
      className={itemClass.root}
      onClick={onClick}
      icon={
        <SvgIcon fontSize="small" htmlColor={color}>
          <FormatColorTextIcon />
        </SvgIcon>
      }
    />
  )
}

export default ColorPickerButton
