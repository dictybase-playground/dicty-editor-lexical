import React, { useCallback, useMemo } from "react"
import { Select, MenuItem } from "@material-ui/core"
import { useAtomValue } from "jotai/utils"
import { blockTypeAtom } from "context/AtomConfigs"
import useToolbarButtonStyles from "utils/ToolBarItemStyles"
import useBlockFormat from "hooks/useBlockFormat"

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
  const blockType = useAtomValue(blockTypeAtom)
  const classes = useToolbarButtonStyles()
  const joinedClasses = `${classes.root} ${classes.spaced}`

  const {
    formatParagraph,
    formatHeading,
    formatBulletList,
    formatNumberedList,
    formatQuote,
  } = useBlockFormat()

  const functionMap = useMemo(
    () => ({
      paragraph: formatParagraph,
      h1: () => formatHeading("h1"),
      h2: () => formatHeading("h2"),
      h3: () => formatHeading("h3"),
      h4: () => formatHeading("h4"),
      bullet: formatBulletList,
      number: formatNumberedList,
      quote: formatQuote,
    }),
    [
      formatBulletList,
      formatHeading,
      formatNumberedList,
      formatParagraph,
      formatQuote,
    ],
  )

  const onChange = useCallback(
    (
      event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
    ) => {
      functionMap[event.target.value as keyof typeof functionMap]()
    },
    [functionMap],
  )

  return (
    <Select
      title={title}
      className={joinedClasses}
      onChange={onChange}
      value={blockType}>
      {Object.keys(blockTypeToBlockName).map((option) => (
        <MenuItem key={option} value={option}>
          {blockTypeToBlockName[option as keyof typeof blockTypeToBlockName]}
        </MenuItem>
      ))}
    </Select>
  )
}

export default BlockFormatDropdown
