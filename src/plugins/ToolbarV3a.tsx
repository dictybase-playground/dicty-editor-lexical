import {
  Divider,
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
  FontSizeDropdown,
} from "components"
import ToolBar from "@material-ui/core/Toolbar"
import useCleanup from "../hooks/useCleanup"

const ToolbarV3a = () => {
  useCleanup()
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
