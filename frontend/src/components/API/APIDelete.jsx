import API from "../../styles/API"

export const APIDelete = ({ deletes, activateModal, mauro }) => {

  const showModal = (api) => {
    mauro(api)
    activateModal(p => !p)
  }

  return (
    <div>
      <div>
        {deletes.map(api => (
          <div
            key={api.id}
            className={API.card + API.deleteCard}
            onClick={() => showModal(api)}>
            <div className={API.method + API.deleteMethod}>
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