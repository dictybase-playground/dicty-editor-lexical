import React from "react"
import type { LexicalNode, Klass } from "lexical"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { Container, Paper } from "@material-ui/core"
import EditorComposer from "./EditorComposer"

type EditorBaseProperties = {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactElement | React.ReactElement[]
  // eslint-disable-next-line react/require-default-props
  nodes?: Klass<LexicalNode>[]
}

const EditorBase = ({ children = [], nodes = [] }: EditorBaseProperties) => (
  <EditorComposer nodes={nodes}>
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
