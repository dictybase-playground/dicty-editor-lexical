import {
  Divider,
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
  FontSizeDropdown,
} from "components"
import ToolBar from "@material-ui/core/Toolbar"
import useToolbarStyles from "hooks/useToolbarStyles"
import useCleanup from "hooks/useCleanup"

const ToolbarV3a = () => {
  useCleanup()
  const classes = useToolbarStyles()
  return (
    <ToolBar className={classes.root}>
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
      <Divider />
      <FontSizeDropdown />
    </ToolBar>
  )
}

export default ToolbarV3a
