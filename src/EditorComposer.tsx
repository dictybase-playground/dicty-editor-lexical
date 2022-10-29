import React from "react"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import type { LexicalNode, Klass } from "lexical"

type EditorComposerProperties = {
  children: React.ReactElement
  // eslint-disable-next-line react/require-default-props
  nodes?: Klass<LexicalNode>[]
}

const baseTheme = {
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

const EditorComposer = ({ children, nodes = [] }: EditorComposerProperties) => {
  const initialConfig = {
    namespace: "DictyEditor",
    theme: baseTheme,
    onError,
    nodes,
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>{children}</LexicalComposer>
  )
}

export default EditorComposer
