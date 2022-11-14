import {
  Divider,
  FormatBoldButton,
  FormatItalicButton,
  FormatUnderlineButton,
  FontSizeDropdown,
  FontFamilyDropdown,
} from "components"
import useToolbarStyles from "utils/ToolbarStyles"
import useToolbarCleanup from "hooks/useToolbarCleanupV2b"

const ToolbarV3b = () => {
  useToolbarCleanup()
  const toolbarClasses = useToolbarStyles()

  return (
    <div className={toolbarClasses.root}>
      <FormatBoldButton />
      <FormatItalicButton />
      <FormatUnderlineButton />
      <Divider />
      <FontSizeDropdown />
      <FontFamilyDropdown />
    </div>
  )
}

export default ToolbarV3b
