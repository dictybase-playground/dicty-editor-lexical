import EditorBase from "EditorBase"
import ToolbarV2d from "plugins/ToolbarPlugin/versions/ToolbarV2d"
import PulsePlugin from "plugins/PulsePlugin"

const EditorV2d = () => (
  <EditorBase>
    <PulsePlugin />
    <ToolbarV2d />
  </EditorBase>
)

export default EditorV2d
