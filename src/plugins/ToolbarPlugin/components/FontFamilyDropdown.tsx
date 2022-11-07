import React from "react"
import { Select, MenuItem } from "@material-ui/core"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import { fontFamilyAtom } from "context/AtomConfigs"
import type FontOptions from "types/FontOptions"
import applyStyleText from "../utils/applyTextStyles"

const defaultFontFamilyOptions: FontOptions = [
  ["Arial", "Arial"],
  ["Courier New", "Courier New"],
  ["Georgia", "Georgia"],
  ["Times New Roman", "Times New Roman"],
  ["Trebuchet MS", "Trebuchet MS"],
  ["Verdana", "Verdana"],
]

interface IFontFamilyDropdown {
  fontOptions?: FontOptions
}

const FontFamilyDropdown = ({
  fontOptions = defaultFontFamilyOptions,
}: IFontFamilyDropdown) => {
  const [fontFamily] = useAtom(fontFamilyAtom)
  const [editor] = useLexicalComposerContext()

  const onFontFamilySelect = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ) => {
    applyStyleText(editor, { "font-family": event.target.value as string })
  }

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
