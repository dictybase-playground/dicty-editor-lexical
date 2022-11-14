import React from "react"
import { Select, MenuItem } from "@material-ui/core"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import { fontFamilyAtom } from "context/AtomConfigs"
import applyStyleText from "utils/textStyles"
import useToolbarItemStyles from "utils/ToolBarItemStyles"

const defaultFontFamilyOptions = [
  "Arial",
  "Courier New",
  "Georgia",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
]

type FontFamilySelectProperties = React.ChangeEvent<{
  name?: string | undefined
  value: unknown
}>

type FontFamilyDropdownProperties = {
  fontOptions?: typeof defaultFontFamilyOptions
}

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
      {fontOptions.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  )
}

export default FontFamilyDropdown
