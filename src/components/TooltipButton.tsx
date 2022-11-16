import React from "react"
import { IconButton, Tooltip } from "@material-ui/core"

type TooltipButtonProperties = {
  title: string
  icon: React.ReactElement
  onClick: React.MouseEventHandler<HTMLButtonElement>
  className: string
}

const TooltipButton = ({
  title,
  icon,
  onClick,
  className,
}: TooltipButtonProperties) => (
  <Tooltip arrow title={title}>
    <IconButton onClick={onClick} className={className} aria-label={title}>
      {icon}
    </IconButton>
  </Tooltip>
)

export default TooltipButton
