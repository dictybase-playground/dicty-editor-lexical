import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import EditorBase from "components/EditorBase"
import ToolbarV5 from "plugins/ToolbarV5"
import Actions from "components/Actions"

const EditorV6 = () => (
  <EditorBase>
    <HistoryPlugin />
    <Actions />
    <ToolbarV5 />
  </EditorBase>
)

export default EditorV6
