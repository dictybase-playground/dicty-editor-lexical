import React from "react"
import { Select, MenuItem } from "@material-ui/core"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import { fontSizeAtom } from "context/AtomConfigs"
import applyStyleText from "../utils/textStyles"

type FontSizeDropdownProperties = {
  start?: number
  end?: number
}

type FontSizeSelectProperties = React.ChangeEvent<{
  name?: string | undefined
  value: unknown
}>

const genFontSize = (start: number, end: number) =>
  [...new Array(end - start + 1).keys()]
    .map((x) => x + start)
    .map((x) => [`${x}px`, `${x}px`])

const FontSizeDropdown = ({
  start = 10,
  end = 20,
}: FontSizeDropdownProperties) => {
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
      {genFontSize(start, end).map(([option, size]) => (
        <MenuItem key={option} value={option}>
          {size}
        </MenuItem>
      ))}
    </Select>
  )
}

export default FontSizeDropdown
