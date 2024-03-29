import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { Grid, Paper, makeStyles } from "@material-ui/core"
import ToolbarV6Plugin from "plugins/ToolbarV6"
import LocalPersistencePlugin from "components/LocalPersistencePlugin"
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

const usePersistencePluginLayoutStyles = makeStyles({
  root: { marginTop: "0.25rem", alignSelf: "flex-end" },
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
  const persistencePluginLayoutClasses = usePersistencePluginLayoutStyles()
  const paperClasses = usePaperStyles()

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <HistoryPlugin />
      <ListPlugin />
      <Grid container direction="column">
        <Grid item>
          <ToolbarV6Plugin />
        </Grid>
        <Grid item>
          <Paper className={paperClasses.root}>
            <RichTextPlugin
              ErrorBoundary={LexicalErrorBoundary}
              contentEditable={
                <ContentEditable className={inputClasses.root} />
              }
              placeholder={
                <div className={placeholderClasses.root}>
                  Enter some text...
                </div>
              }
            />
          </Paper>
        </Grid>
        <Grid item className={persistencePluginLayoutClasses.root}>
          <LocalPersistencePlugin />
        </Grid>
      </Grid>
    </LexicalComposer>
  )
}

export default EditorV7
