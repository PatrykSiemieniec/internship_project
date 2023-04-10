import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { lang } from "../translations/lang";
import "../styles/header.scss";
import { setLanguage } from "../store/lang-slice";
const Header = () => {
  const dispatch = useDispatch();

  const chosenLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  const language = lang[chosenLanguage].header;
  const polish = language.pl;
  const english = language.en;
  return (
    <header className="header">
      <nav className="header__items">
        <NavLink className="header__items__name" to="/">
          {language.projectName}
        </NavLink>
        <div className="header__items__link">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to="/"
          >
            {language.mainPage}
          </NavLink>
          <NavLink to="/views">{language.views} </NavLink>
          <select
            className="select"
            onChange={(e) => dispatch(setLanguage(e.target.value))}
          >
            <option className="xd" value="pl">
              {polish}
            </option>
            <option value="en">{english}</option>
          </select>
        </div>
      </nav>
    </header>
  );
};

export default Header;
