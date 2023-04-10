import React from "react";
import "../styles/views.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { lang } from "../translations/lang";

interface Props {
  key: React.Key;
  birth_date: string;
  name: String;
  age: Number;
  biography: String | undefined;
}

const Views = () => {
  const data = useSelector((state: RootState) => state.tableData.dataSource);

  const chosenLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  const language = lang[chosenLanguage].form_table;

  if (data.length === 0) {
    return <p className="info">{language.info}</p>;
  }

  const views = data.map((item) => (
    <ViewsItems
      key={item.key}
      birth_date={item.birth_date}
      name={item.name}
      biography={item.biography}
      age={item.age}
    />
  ));

  return <div className="grid-container">{views}</div>;
};

const ViewsItems = (props: Props) => {
  const chosenLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  const language = lang[chosenLanguage].form_table;
  return (
    <div className="grid-item">
      <div className="grid-item__name">{props?.name}</div>
      <div className="grid-item__birth">
        <span>{language.birth_date}:</span> {props?.birth_date.toString()}
      </div>
      <div className="grid-item__age">
        <span>{language.age}:</span> {props?.age.toString()}
      </div>
      <div className="grid-item__cv">
        <span>{language.biography}:</span> {props?.biography}
      </div>
    </div>
  );
};

export default Views;
