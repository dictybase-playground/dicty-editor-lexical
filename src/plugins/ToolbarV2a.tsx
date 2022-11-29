import { Divider, FormatBoldButton } from "components"
import useToolbarStyles from "hooks/useToolbarStyles"
import useToolbarCleanup from "hooks/useToolbarCleanupV2a"

const ToolbarV2 = () => {
  useToolbarCleanup()
  const toolbarClasses = useToolbarStyles()

  return (
    <div className={toolbarClasses.root}>
      <Divider />
      <FormatBoldButton />
    </div>
  )
}

export default ToolbarV2
