import EditorBase from "EditorBase"
import ToolbarV2d from "plugins/ToolbarPlugin/versions/ToolbarV2d"
import PulsePlugin from "plugins/PulsePlugin"
import TreeViewPlugin from "plugins/TreeViewPlugin"

const EditorV2d = () => (
  <EditorBase>
    <PulsePlugin />
    <ToolbarV2d />
    <TreeViewPlugin />
  </EditorBase>
)

export default EditorV2d
