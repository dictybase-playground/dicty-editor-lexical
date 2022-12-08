import EditorBase from "components/EditorBase"
import ToolbarV4 from "plugins/ToolbarV4"
import PersistencePlugin from "components/PersistencePlugin"

const EditorV5 = () => (
  <EditorBase>
    <PersistencePlugin />
    <ToolbarV4 />
  </EditorBase>
)

export default EditorV5
