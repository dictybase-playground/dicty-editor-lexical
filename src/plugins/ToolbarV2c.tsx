import {
  Divider,
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
} from "components"
import useToolbarStyles from "utils/ToolbarStyles"
import useToolbarCleanup from "hooks/useToolbarCleanupV2b"

const ToolbarV2 = () => {
  useToolbarCleanup()
  const toolbarClasses = useToolbarStyles()

  return (
    <div className={toolbarClasses.root}>
      <Divider />
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
    </div>
  )
}

export default ToolbarV2
