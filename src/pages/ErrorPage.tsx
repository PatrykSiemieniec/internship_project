import Header from "../components/Header";
import "../styles/errorPage.scss";
import { ReactSVG } from "react-svg";
const ErrorPage = () => {
  return (
    <div>
      <Header />
      <main className="error_container">
        <ReactSVG src="src\assets\404.svg" />
      </main>
    </div>
  );
};

export default ErrorPage;
