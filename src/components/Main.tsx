import React, { useState, FC } from "react";
import "../styles/main.scss";
import { Table, Space, PaginationProps, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import Form from "./Form";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { deleteMultipleRows, deleteRow, edit } from "../store/tableData-slice";
import { lang } from "../translations/lang";

interface DataType {
  key: React.Key;
  birth_date: string;
  name: string;
  age: number;
  biography: string | undefined;
}

const Main: FC = () => {
  const [pagination, setPagination] = useState<number>(10);
  const [isMultipleChosen, setIsMultipleChosen] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [recordToEdit, setRecordToEdit] = useState<any>();
  const [isEditingForm, setIsEditingForm] = useState<boolean>(false);
  const dispatch = useDispatch();

  const chosenLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  const language = lang[chosenLanguage].form_table;
  const name = language.name;
  const age = language.age;
  const birth_date = language.birth_date;
  const biography = language.biography;
  const action = language.action;

  const columns: ColumnsType<DataType> = [
    {
      title: name,
      dataIndex: "name",
      key: "name",
    },
    {
      title: age,
      dataIndex: "age",
      key: "age",
    },
    {
      title: birth_date,
      dataIndex: "birth_date",
      key: "birth_date",
    },
    {
      title: biography,
      dataIndex: "biography",
      key: "biography",
      ellipsis: true,
    },
    {
      title: action,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setRecordToEdit(record);
              setIsEditingForm(true);
            }}
          >
            {language.edit}
          </a>
          <a onClick={() => dispatch(deleteRow(record))}>{language.delete}</a>
        </Space>
      ),
    },
  ];

  const dataSource = useSelector(
    (state: RootState) => state.tableData.dataSource
  );

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    _,
    pageSize
  ) => {
    setPagination(pageSize);
  };

  const onSelectHandler = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
    selectedRowKeys.length > 0
      ? setIsMultipleChosen(true)
      : setIsMultipleChosen(false);
  };

  return (
    <div className="main">
      <div className="table">
        <Table
          dataSource={dataSource}
          columns={columns}
          rowSelection={{
            type: "checkbox",
            onChange: onSelectHandler,
          }}
          scroll={{ y: 400 }}
          pagination={{
            pageSize: pagination,
            showSizeChanger: true,
            onShowSizeChange: onShowSizeChange,
            pageSizeOptions: [10, 20, 50],
          }}
        />
        {isMultipleChosen && (
          <Button
            type={"primary"}
            onClick={() => {
              dispatch(deleteMultipleRows(selectedRowKeys));
              setSelectedRowKeys([]);
              setIsMultipleChosen(false);
            }}
          >
            {language.deleteChosen}
          </Button>
        )}
      </div>
      <div className="form">
        <Form
          recordToEdit={recordToEdit}
          isEditingForm={isEditingForm}
          setIsEditingForm={setIsEditingForm}
        />
      </div>
    </div>
  );
};

export default Main;
