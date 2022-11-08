import EditorBase from "EditorBase"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import ToolbarV4 from "plugins/ToolbarPlugin/versions/ToolbarV4"

const EditorV4 = () => (
  <EditorBase>
    <HistoryPlugin />
    <ToolbarV4 />
  </EditorBase>
)

export default EditorV4
