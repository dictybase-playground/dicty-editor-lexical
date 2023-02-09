import { LexicalComposer } from "@lexical/react/LexicalComposer"

type LexicalTestComposerProperties = {
  children: JSX.Element | string | (JSX.Element | string)[]
}

const onError = (error: Error) => {
  // eslint-disable-next-line no-console
  console.error(error)
}

const LexicalTestComposer = ({ children }: LexicalTestComposerProperties) => (
  <LexicalComposer initialConfig={{ namespace: "Testing", onError }}>
    {children}
  </LexicalComposer>
)

export default LexicalTestComposer
