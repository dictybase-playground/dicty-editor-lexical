import { $getRoot, $getSelection } from "lexical"
import type { EditorState } from "lexical"
import { useEffect } from "react"
import { Container, Paper } from "@material-ui/core"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { ListItemNode, ListNode } from "@lexical/list"
import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { LinkNode } from "@lexical/link"
import exampleTheme from "themes/exampleTheme"
import ToolbarPlugin from "plugins/ToolbarPlugin"

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
const onChange = (editorState: EditorState) => {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot()
    const selection = $getSelection()

    // eslint-disable-next-line no-console
    console.log(root, selection)
  })
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
const MyCustomAutoFocusPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus()
  }, [editor])

  // eslint-disable-next-line unicorn/no-null
  return null
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
const onError = (error: Error) => {
  // eslint-disable-next-line no-console
  console.error(error)
}

const nodes = [
  HeadingNode,
  QuoteNode,
  CodeHighlightNode,
  CodeNode,
  LinkNode,
  ListItemNode,
  ListNode,
]

const Editor = () => {
  const initialConfig = {
    namespace: "MyEditor",
    theme: exampleTheme,
    onError,
    nodes,
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Container>
        <ToolbarPlugin />
        {/* use Makestyles later */}
        <Paper style={{ position: "relative" }}>
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={
              <div className="editor-placeholder">Enter some text...</div>
            }
          />
          <ListPlugin />
          <LinkPlugin />
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          <MyCustomAutoFocusPlugin />
        </Paper>
      </Container>
    </LexicalComposer>
  )
}

export default Editor
