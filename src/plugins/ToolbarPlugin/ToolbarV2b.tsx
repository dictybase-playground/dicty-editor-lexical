import useToolbarStyles from "styles/ToolbarStyles"
import { Divider, FormatBoldButton, FormatItalicButton } from "components"
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
