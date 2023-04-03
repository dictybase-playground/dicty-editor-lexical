export default function joinClasses(...arguments_: string[]) {
  return arguments_.filter(Boolean).join(" ")
}
