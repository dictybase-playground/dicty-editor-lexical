import React from "react"
import { Select, MenuItem } from "@material-ui/core"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import { fontSizeAtom } from "context/AtomConfigs"
import applyStyleText from "../utils/textStyles"

type FontSizeOptionsProperties = Array<Array<string>>

type IFontSizeDropdown = {
  fontSizeOptions?: FontSizeOptionsProperties
}

type FontSizeSelectProperties = React.ChangeEvent<{
  name?: string | undefined
  value: unknown
}>

const defaultFontSizeOptions: FontSizeOptionsProperties = [
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

const FontSizeDropdown = ({
  fontSizeOptions = defaultFontSizeOptions,
}: IFontSizeDropdown) => {
  const [editor] = useLexicalComposerContext()
  const [fontSize] = useAtom(fontSizeAtom)

  const onFontSizeSelect = (event: FontSizeSelectProperties) => {
    applyStyleText(editor, { "font-size": event.target.value as string })
  }
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
