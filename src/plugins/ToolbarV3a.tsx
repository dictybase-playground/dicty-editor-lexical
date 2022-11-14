import {
  Divider,
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
  FontSizeDropdown,
} from "components"
import useToolbarCleanup from "hooks/useToolbarCleanupV2b"
import ToolBar from "@material-ui/core/Toolbar"

const ToolbarV3a = () => {
  useToolbarCleanup()
  return (
    <ToolBar>
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
      <Divider />
      <FontSizeDropdown />
    </ToolBar>
  )
}

export default ToolbarV3a
