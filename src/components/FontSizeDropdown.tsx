import React from "react"
import { Select, MenuItem, Tooltip } from "@material-ui/core"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtom } from "jotai"
import { fontSizeAtom } from "context/AtomConfigs"
import applyStyleText from "utils/textStyles"
import useToolbarItemStyles from "utils/ToolBarItemStyles"

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
  const classes = useToolbarItemStyles()
  const joinedClasses = `${classes.root} ${classes.spaced}`

  const onFontSizeSelect = (event: FontSizeSelectProperties) => {
    applyStyleText(editor, { "font-size": event.target.value as string })
  }
  return (
    <Tooltip arrow title="Font Size">
      <Select
        className={joinedClasses}
        onChange={onFontSizeSelect}
        value={fontSize}>
        {genFontSize(start, end).map(([option, size]) => (
          <MenuItem key={option} value={option}>
            {size}
          </MenuItem>
        ))}
      </Select>
    </Tooltip>
  )
}

export default FontSizeDropdown
