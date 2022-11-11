import Divider from "ui/Divider"
import {
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
} from "../components/buttons"
import FontSizeDropdown from "../components/FontSizeDropdown"
import useToolbarCleanup from "./useToolbarCleanupV2b"

const ToolbarV3a = () => {
  useToolbarCleanup()
  return (
    <div className="toolbar">
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
      <Divider />
      <FontSizeDropdown />
    </div>
  )
}

export default ToolbarV3a
