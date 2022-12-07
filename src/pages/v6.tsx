import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import EditorBase from "components/EditorBase"
import ToolbarV5 from "plugins/ToolbarV5"

const EditorV6 = () => (
  <EditorBase>
    <HistoryPlugin />
    <ToolbarV5 />
  </EditorBase>
)

export default EditorV6
