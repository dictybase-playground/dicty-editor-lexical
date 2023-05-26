```mermaid
sequenceDiagram
    participant Toolbar
    participant Editor State
    participant Atoms
    Toolbar->>Editor State: Affects nodes of
    Editor State->>Atoms: on selection / update, set Atom state
    Atoms->>Toolbar: updates UI of
```