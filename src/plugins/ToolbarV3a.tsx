import {
  Divider,
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
  FontSizeDropdown,
} from "components"
import useToolbarStyles from "utils/ToolbarStyles"
import ToolBar from "@material-ui/core/Toolbar"
import useCleanup from "../hooks/useCleanup"

const ToolbarV3a = () => {
  useCleanup()
  const toolbarClasses = useToolbarStyles()
  return (
    <ToolBar className={toolbarClasses.root}>
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
      <Divider />
      <FontSizeDropdown />
    </ToolBar>
  )
}

export default ToolbarV3a
