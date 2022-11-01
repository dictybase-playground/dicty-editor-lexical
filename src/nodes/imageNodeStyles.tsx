import { makeStyles } from "@material-ui/core"

const useImageNodeStyles = makeStyles({
  contentEditable: {
    minHeight: "20px",
    border: "0px",
    resize: "none",
    cursor: "text",
    caretColor: "rgb(5, 5, 5)",
    display: "block",
    position: "relative",
    tabSize: "1",
    outline: "0px",
    padding: "10px",
    userSelect: "text",
    fontSize: "12px",
    width: "calc(100% - 20px)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  placeholder: {
    fontSize: "12px",
    color: "#888",
    overflow: "hidden",
    position: "absolute",
    textOverflow: "ellipsis",
    top: "10px",
    left: "10px",
    userSelect: "none",
    whiteSpace: "nowrap",
    display: "inline-block",
    pointerEvents: "none",
  },
})

export default useImageNodeStyles
