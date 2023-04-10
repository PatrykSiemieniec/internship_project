import "../styles/form.scss";
import { FC, useState, useEffect } from "react";
import { Button } from "antd";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { add, edit } from "../store/tableData-slice";

import { lang } from "../translations/lang";

const tableDataSchema = yup
  .object({
    name: yup.string().required("Imie jest wymagane"),
    age: yup.number().required().positive().integer(),
    birth_date: yup.date().required(),
    biography: yup.string().max(250).optional(),
  })
  .required();
type FormData = yup.InferType<typeof tableDataSchema>;

interface Record {
  key: React.Key;
  birth_date: string;
  name: string;
  age: number;
  biography: string | undefined;
}
type FormProps = {
  recordToEdit: Record;
  isEditingForm: boolean;
  setIsEditingForm: Function;
};

const Form: FC<FormProps> = (props) => {
  const [key, setKey] = useState<React.Key>();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(tableDataSchema),
  });

  const dataToEdit = props.recordToEdit;

  useEffect(() => {
    setKey(dataToEdit?.key);
    setValue("name", dataToEdit?.name);
    setValue("age", dataToEdit?.age);
    setValue("biography", dataToEdit?.biography);
  }, [dataToEdit]);

  const onSubmit = (data: FormData) => {
    const date = data.birth_date;
    const timestamp = date.getTime();

    dispatch(add({ ...data, birth_date: timestamp }));
    reset();
  };

  const onSaveEdit = (data: FormData) => {
    const date = data.birth_date;
    const timestamp = date.getTime();

    dispatch(edit({ ...data, key, birth_date: timestamp }));
    props.setIsEditingForm(false);
    reset();
  };

  const chosenLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  const language = lang[chosenLanguage].form_table;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form__div">
        <label>{language.name}</label>
        <input {...register("name")} />
        <p>{errors.name?.message}</p>
      </div>
      <div className="form__div">
        <label>{language.age}</label>
        <input {...register("age")} />
        <p>{errors.age?.message}</p>
      </div>
      <div className="form__div">
        <label>{language.birth_date}</label>
        <input type="date" {...register("birth_date")} />
        <p>{errors.birth_date?.message}</p>
      </div>
      <div className="form__textarea">
        <label>{language.biography}</label>
        <textarea rows={5} cols={32} {...register("biography")} />
        <p>{errors.biography?.message}</p>
      </div>
      {props.isEditingForm ? (
        <Button
          htmlType="button"
          type="primary"
          onClick={handleSubmit(onSaveEdit)}
        >
          {language.saveChanges}
        </Button>
      ) : (
        <Button htmlType="submit" type="primary">
          {language.save}
        </Button>
      )}
    </form>
  );
};

export default Form;
