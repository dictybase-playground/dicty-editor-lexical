import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import EditorBase from "components/EditorBase"
import ToolbarV6 from "plugins/ToolbarV6"
import Actions from "components/Actions"

const EditorV6 = () => (
  <EditorBase>
    <HistoryPlugin />
    <ListPlugin />
    <Actions />
    <ToolbarV6 />
  </EditorBase>
)

export default EditorV6
