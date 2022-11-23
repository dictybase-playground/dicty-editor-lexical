# Toolbar Feature Integration Workflow

1. Create component
2. Create appropriate AtomConfigs
3. Add component to appropriate toolbar
4. Add necessary plugins to Editor
5. Create / Modify appropriate useXXXproperties hook
6. Call useXXXproperties hook in useEditorProperties
7. Call useEditorProperties in useCleanup (if not already)
8. Add necessary styling
