import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import EditorBase from "components/EditorBase"
import ToolbarV6 from "plugins/ToolbarV6"

const EditorV7 = () => (
  <EditorBase>
    <HistoryPlugin />
    <ListPlugin />
    <ToolbarV6 />
  </EditorBase>
)

export default EditorV7
