import { useEffect } from "react"
import SaveButton from "components/SaveButton"
import useLocalStorage from "hooks/useLocalStorage"

const LocalPersistencePlugin = () => {
  const { retrieveLocalStorage, saveLocalStorage } = useLocalStorage()

  useEffect(() => {
    retrieveLocalStorage()
  }, [retrieveLocalStorage])

  return <SaveButton save={saveLocalStorage} />
}

export default LocalPersistencePlugin
