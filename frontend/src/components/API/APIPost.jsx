import API from "../../styles/API"


export const APIPost = ({posts, activateModal, mauro}) => {

  const showModal = (api) => {
    mauro(api)
    activateModal(p => !p)
  }

  return (
    <div>
      <div>
        {posts.map(api => (
          <div
          key={api.id}
          className={API.card + API.postCard}
            onClick={() => showModal(api)}>
            <div className={API.method + API.postMethod}>
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