import EditorBase from "EditorBase"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import ToolbarV5 from "plugins/ToolbarPlugin/versions/ToolbarV5"

const EditorV5 = () => (
  <EditorBase>
    <HistoryPlugin />
    <ToolbarV5 />
  </EditorBase>
)

export default EditorV5
