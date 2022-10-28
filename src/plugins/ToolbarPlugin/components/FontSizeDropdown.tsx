import React, { useCallback, useContext } from "react"
import { Select, MenuItem } from "@material-ui/core"
import ToolbarContext, { IToolbarContext } from "context/ToolbarContext"
import type FontOptions from "types/FontOptions"

const defaultFontSizeOptions: FontOptions = [
  ["10px", "10px"],
  ["11px", "11px"],
  ["12px", "12px"],
  ["13px", "13px"],
  ["14px", "14px"],
  ["15px", "15px"],
  ["16px", "16px"],
  ["17px", "17px"],
  ["18px", "18px"],
  ["19px", "19px"],
  ["20px", "20px"],
]

interface IFontSizeDropdown {
  // eslint-disable-next-line react/require-default-props
  fontSizeOptions?: FontOptions
}

const FontSizeDropdown = ({
  fontSizeOptions = defaultFontSizeOptions,
}: IFontSizeDropdown) => {
  const { fontSize, applyStyleText } = useContext(
    ToolbarContext,
  ) as IToolbarContext

  const onFontSizeSelect = useCallback(
    (
      event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
    ) => {
      applyStyleText({ "font-size": event.target.value as string })
    },
    [applyStyleText],
  )
  return (
    <Select
      className="toolbar-item font-size"
      onChange={onFontSizeSelect}
      value={fontSize}>
      {fontSizeOptions.map(([option, size]) => (
        <MenuItem key={option} value={option}>
          {size}
        </MenuItem>
      ))}
    </Select>
  )
}

export default FontSizeDropdown
