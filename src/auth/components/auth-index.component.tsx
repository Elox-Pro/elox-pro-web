import LoginForm from "./login-form.component"

const AuthIndex = () => {
  return (
    <>
      <main className="container-fluid p-0">
        <div className="row justify-content-center">
          <div className="text-center mb-5">
            <img className="img-fluid" src="icons/logo-520.png" width={80} />
          </div>
          <div className="col-sm-12 col-md-8 col-lg-6">
            <LoginForm />
          </div>
        </div>
      </main>
    </>
  )
}

export default AuthIndex
