import React from "react"
import { Select, Tooltip } from "@material-ui/core"

type onChangeProperties = React.ChangeEvent<{
  name?: string | undefined
  value: unknown
}>

type TooltipDropdownProperties = {
  title: string
  onChange: (event: onChangeProperties) => void
  value: string
  className: string
  children: React.ReactElement | React.ReactElement[]
}

const TooltipDropdown = ({
  title,
  className,
  onChange,
  value,
  children,
}: TooltipDropdownProperties) => (
  <Tooltip arrow title={title}>
    <Select
      onChange={onChange}
      className={className}
      value={value}
      aria-label={title}>
      {children}
    </Select>
  </Tooltip>
)

export default TooltipDropdown
