import "./LogIn.css";
import { Link } from "react-router-dom";

function LogIn() {
  return (
    <div className="d-flex flex-row justify-content-center align-items-center my-3">
      <div className="d-flex flex-column justify-content-center align-items-center my-3">
      <form className="form p-4">
        <h1 className="fs-5 text-center parent-font">Log In to SIS</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label child-font">
            ID Number:
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label child-font">
            Email address:
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label child-font">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center mt-3">
          <Link to = "/SIS/student">
          <button type="submit" className="btn submit parent-font">
            Submit
          </button>
          </Link>
        </div>
      </form>
      <div>Not Yet manually tagged? Register <Link to = "/register">here</Link>.</div>
      </div>
    </div>
  );
}

export default LogIn;
