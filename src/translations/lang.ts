interface LangType {
  [key: string]: {
    header: {
      projectName: string;
      mainPage: string;
      views: string;
      pl: string;
      en: string;
    };
    form_table: {
      name: string;
      age: string;
      birth_date: string;
      biography: string;
      action: string;
      edit: string;
      delete: string;
      deleteChosen: string;
      save: string;
      saveChanges: string;
      info: string;
    };
  };
}

export const lang: LangType = {
  pl: {
    header: {
      projectName: "Projekt stażowy",
      mainPage: "Strona główna",
      views: "Widok",
      pl: "Polski",
      en: "Angielski",
    },
    form_table: {
      name: "Imie",
      age: "Wiek",
      birth_date: "Data urodzenia",
      biography: "Życiorys",
      action: "Akcja",
      edit: "Edytuj",
      delete: "Usuń",
      deleteChosen: "Usuń wybrane",
      save: "Zapisz",
      saveChanges: "Zapisz zmiany",
      info: " Brak Pozycji do wyświetlenia",
    },
  },
  en: {
    header: {
      projectName: "Internship project",
      mainPage: "Main page",
      views: "Views",
      pl: "Polish",
      en: "English",
    },
    form_table: {
      name: "Name",
      age: "Age",
      birth_date: "Birth date",
      biography: "Biography",
      action: "Action",
      edit: "Edit",
      delete: "Delete",
      deleteChosen: "Delete chosen",
      save: "Save",
      saveChanges: "Save changes",
      info: "There are no items to display",
    },
  },
};
