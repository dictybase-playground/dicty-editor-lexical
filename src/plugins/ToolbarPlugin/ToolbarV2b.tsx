import Divider from "components/Divider"
import useToolbarStyles from "styles/ToolbarStyles"
import { FormatBoldButton, FormatItalicButton } from "components"
import useToolbarCleanup from "hooks/useToolbarCleanupV2b"

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
