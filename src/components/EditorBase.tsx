import React from "react"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { Container, Paper } from "@material-ui/core"
import {
  useEditorInputStyles,
  useEditorPlaceholderStyles,
} from "hooks/useEditorStyles"
import "styles/editor.css"
import EditorComposer from "./EditorComposer"

type EditorBaseProperties = {
  children?: React.ReactElement | React.ReactElement[]
}

const EditorBase = ({ children }: EditorBaseProperties) => {
  const inputClasses = useEditorInputStyles()
  const placeholderClasses = useEditorPlaceholderStyles()

  return (
    <EditorComposer>
      <Container style={{ position: "relative" }}>
        {children}
        <Paper style={{ position: "relative" }}>
          <RichTextPlugin
            ErrorBoundary={LexicalErrorBoundary}
            contentEditable={<ContentEditable className={inputClasses.root} />}
            placeholder={
              <div className={placeholderClasses.root}>Enter some text...</div>
            }
          />
        </Paper>
      </Container>
    </EditorComposer>
  )
}

export default EditorBase
