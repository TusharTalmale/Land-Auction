import { APIGet } from "./APIGet"
import { APIPost } from "./APIPost"
import { APIDelete } from "./APIDelete"

export const APICalls = ({list, activateModal, mauro}) => {

  return(
    <div>
      <div>
        <APIGet mauro={mauro} gets={list.filter(a => a.method === "GET")} activateModal={activateModal} />
      </div>
      <div>
        <APIPost mauro={mauro} posts={list.filter(a => a.method === "POST")} activateModal={activateModal} />
      </div>
      <div>
        <APIDelete mauro={mauro} deletes={list.filter(a => a.method === "DELETE")} activateModal={activateModal} />
      </div>
    </div>
  )
}