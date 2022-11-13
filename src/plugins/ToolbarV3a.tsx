import {
  Divider,
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
  FontSizeDropdown,
} from "components"
import useToolbarCleanup from "hooks/useToolbarCleanupV2b"

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
