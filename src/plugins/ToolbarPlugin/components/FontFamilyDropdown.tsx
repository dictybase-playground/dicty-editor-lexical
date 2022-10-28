import React, { useCallback, useContext } from "react"
import { Select, MenuItem } from "@material-ui/core"
import ToolbarContext, { IToolbarContext } from "context/ToolbarContext"
import type FontOptions from "types/FontOptions"

const defaultFontFamilyOptions: FontOptions = [
  ["Arial", "Arial"],
  ["Courier New", "Courier New"],
  ["Georgia", "Georgia"],
  ["Times New Roman", "Times New Roman"],
  ["Trebuchet MS", "Trebuchet MS"],
  ["Verdana", "Verdana"],
]

interface IFontFamilyDropdown {
  // eslint-disable-next-line react/require-default-props
  fontOptions?: FontOptions
}

const FontFamilyDropdown = ({
  fontOptions = defaultFontFamilyOptions,
}: IFontFamilyDropdown) => {
  const { fontFamily, applyStyleText } = useContext(
    ToolbarContext,
  ) as IToolbarContext

  const onFontFamilySelect = useCallback(
    (
      event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
    ) => {
      applyStyleText({ "font-family": event.target.value as string })
    },
    [applyStyleText],
  )

  return (
    <Select
      autoWidth
      className="toolbar-item font-family"
      onChange={onFontFamilySelect}
      value={fontFamily}>
      {fontOptions.map(([option, text]) => (
        <MenuItem key={option} value={option}>
          {text}
        </MenuItem>
      ))}
    </Select>
  )
}

export default FontFamilyDropdown
