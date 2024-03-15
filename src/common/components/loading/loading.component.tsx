import "./loading.style.scss"
export default function Loading() {
  return (
    <div className="loading">
      <div className="loading-center">
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  )
}
