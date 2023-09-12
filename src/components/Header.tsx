import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { lang } from "../translations/lang";
import "../styles/header.scss";
import { setLanguage } from "../store/lang-slice";
import { useEffect, useState } from "react";

import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
const Header = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const dispatch = useDispatch();

  const chosenLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  const language = lang[chosenLanguage].header;
  const polish = language.pl;
  const english = language.en;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWidth(width);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <NavLink
          className={({ isActive }) => (isActive ? "active" : undefined)}
          to="/"
        >
          {language.mainPage}
        </NavLink>
      ),
    },
    {
      key: "2",
      label: <NavLink to="/views">{language.views} </NavLink>,
    },
    {
      key: "3",
      label: (
        <div onClick={() => dispatch(setLanguage("pl"))}>{language.pl}</div>
      ),
    },
    {
      key: "4",
      label: (
        <div onClick={() => dispatch(setLanguage("en"))}>{language.en}</div>
      ),
    },
  ];
  return (
    <header className="header">
      <nav className="header__items">
        <NavLink className="header__items__name" to="/">
          {language.projectName}
        </NavLink>
        {width < 700 ? (
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Menu
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        ) : (
          <div className="header__items__link">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : undefined)}
              to="/"
            >
              {language.mainPage}
            </NavLink>
            <NavLink to="/views">{language.views} </NavLink>
            <select
              id="selectLanguage"
              className="select"
              onChange={(e) => dispatch(setLanguage(e.target.value))}
            >
              <option value="pl">{polish}</option>
              <option value="en">{english}</option>
            </select>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
