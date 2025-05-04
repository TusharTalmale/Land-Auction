import API from "../../styles/API"

export const APIGet = ({gets, activateModal, mauro}) => {

  const showModal = (api) => {
    mauro(api)
    activateModal(p => !p)
  }

  return(
    <div>
      <div>
        {gets.map(api => (
          <div
          key={api.id}
          className={API.card + API.getCard}
            onClick={() => showModal(api)}>
            <div className={API.method + API.getMethod}>
              {api.method}
            </div>
            <div className={API.url}>
              {api.url}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}