import Divider from "ui/Divider"
import { FormatBoldButton, FormatItalicButton } from "../components/buttons"
import useToolbarCleanup from "./useToolbarCleanupV2b"

const ToolbarV2 = () => {
  useToolbarCleanup()
  return (
    <div className="toolbar">
      <Divider />
      <FormatBoldButton />
      <FormatItalicButton />
    </div>
  )
}

export default ToolbarV2
