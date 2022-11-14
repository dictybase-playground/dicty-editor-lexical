import React from "react"
import { Select, MenuItem } from "@material-ui/core"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import { fontFamilyAtom } from "context/AtomConfigs"
import applyStyleText from "utils/textStyles"
import useToolbarItemStyles from "utils/ToolBarItemStyles"

type FontOptions = Array<[string, string]>

type FontFamilyDropdownProperties = {
  fontOptions?: FontOptions
}

type FontFamilySelectProperties = React.ChangeEvent<{
  name?: string | undefined
  value: unknown
}>

const defaultFontFamilyOptions: FontOptions = [
  ["Arial", "Arial"],
  ["Courier New", "Courier New"],
  ["Georgia", "Georgia"],
  ["Times New Roman", "Times New Roman"],
  ["Trebuchet MS", "Trebuchet MS"],
  ["Verdana", "Verdana"],
]

const FontFamilyDropdown = ({
  fontOptions = defaultFontFamilyOptions,
}: FontFamilyDropdownProperties) => {
  const [fontFamily] = useAtom(fontFamilyAtom)
  const [editor] = useLexicalComposerContext()
  const classes = useToolbarItemStyles()

  const onFontFamilySelect = (event: FontFamilySelectProperties) => {
    applyStyleText(editor, { "font-family": event.target.value as string })
  }

  return (
    <Select
      autoWidth
      className={classes.root}
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
