# Toolbar Feature Integration Workflow

1. Create component
2. Create appropriate AtomConfigs
3. Add component to appropriate toolbar
4. Add necessary plugins to Editor
5. Create / Modify appropriate useXXXproperties hook
6. Call useXXXproperties hook in useEditorProperties
7. Call useEditorProperties in useCleanup (if not already)
8. Add necessary styling

```mermaid
    graphTD;
        A[Create React component] ---> B{Does the component require a global state?}
        B -- Yes ---> C{Does a corresponding Atom Config exist?}
        C -- Yes ---> D{Use corresponding Atom Config}
        C -- No ---> E{Create, then use Atom Config}
        D & E ---> F[Add component to appropriate toolbar]
        F ---> G[Create new version of editor, if needed]

```
