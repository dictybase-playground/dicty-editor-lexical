import React from "react"
import type { LexicalNode, Klass, EditorThemeClasses } from "lexical"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { Container, Paper } from "@material-ui/core"
import EditorComposer from "./EditorComposer"

type EditorBaseProperties = {
  children: React.ReactElement | React.ReactElement[]
  nodes: Klass<LexicalNode>[]
  theme: EditorThemeClasses
}

const EditorBase = ({
  children = [],
  nodes = [],
  theme = {},
}: EditorBaseProperties) => (
  <EditorComposer nodes={nodes} theme={theme}>
    <Container>
      {children}
      <Paper style={{ position: "relative" }}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={
            <div className="editor-placeholder">Enter some text...</div>
          }
        />
      </Paper>
    </Container>
  </EditorComposer>
)

export default EditorBase
