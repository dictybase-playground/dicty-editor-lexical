import Divider from "ui/Divider"
import useToolbarStyles from "styles/ToolbarStyles"
import { FormatBoldButton, FormatItalicButton } from "../components/buttons"
import useToolbarCleanup from "./useToolbarCleanupV2b"

const ToolbarV2 = () => {
  useToolbarCleanup()
  const toolbarClasses = useToolbarStyles()
  return (
    <div className={toolbarClasses.root}>
      <Divider />
      <FormatBoldButton />
      <FormatItalicButton />
    </div>
  )
}

export default ToolbarV2
