import { Select, MenuItem } from "@material-ui/core"
import { useAtom } from "jotai"
import { blockTypesAtom } from "context/AtomConfigs"
import useToolbarButtonStyles from "utils/ToolBarItemStyles"

const blockTypeToBlockName = {
  paragraph: "Normal",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  bullet: "Bulleted List",
  number: "Numbered List",
  quote: "Quote",
}

const title = "Block Type"

const BlockFormatDropdown = () => {
  const blockType = useAtom(blockTypesAtom)
  const classes = useToolbarButtonStyles()
  const joinedClasses = `${classes.root} ${classes.spaced}`

  return (
    <Select title={title} className={joinedClasses} value={blockType}>
      {Object.keys(blockTypeToBlockName).map((option) => (
        <MenuItem key={option} value={option}>
          {blockTypeToBlockName[option as keyof typeof blockTypeToBlockName]}
        </MenuItem>
      ))}
    </Select>
  )
}

export default BlockFormatDropdown