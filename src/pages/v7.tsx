import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { Container, Paper, makeStyles } from "@material-ui/core"
import ToolbarV6Plugin from "plugins/ToolbarV6"
import PersistencePlugin from "components/PersistencePlugin"
import {
  useEditorInputStyles,
  useEditorPlaceholderStyles,
} from "hooks/useEditorStyles"
import "styles/editor.css"

const usePaperStyles = makeStyles({
  root: {
    position: "relative",
  },
})

const editorTheme = {
  paragraph: "editor-paragraph",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    underline: "editor-text-underline",
  },
}

const onError = (error: Error) => {
  // eslint-disable-next-line no-console
  console.error(error)
}

const initialConfig = {
  namespace: "DictyEditor",
  theme: { ...editorTheme },
  nodes: [HeadingNode, QuoteNode, ListItemNode, ListNode],
  onError,
}

const EditorV7 = () => {
  const inputClasses = useEditorInputStyles()
  const placeholderClasses = useEditorPlaceholderStyles()
  const paperClasses = usePaperStyles()

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Container>
        <HistoryPlugin />
        <ListPlugin />
        <ToolbarV6Plugin />
        <Paper className={paperClasses.root}>
          <RichTextPlugin
            contentEditable={<ContentEditable className={inputClasses.root} />}
            placeholder={
              <div className={placeholderClasses.root}>Enter some text...</div>
            }
          />
        </Paper>
        <PersistencePlugin />
      </Container>
    </LexicalComposer>
  )
}

export default EditorV7
