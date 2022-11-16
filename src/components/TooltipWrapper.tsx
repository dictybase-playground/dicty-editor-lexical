import React from "react"
import { Tooltip } from "@material-ui/core"

type TooltipWrapperProperties = {
  title: string
  children: React.ReactElement
}

const TooltipWrapper = ({ title, children }: TooltipWrapperProperties) => (
  <Tooltip title={title}>{children}</Tooltip>
)

export default TooltipWrapper
