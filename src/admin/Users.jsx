import React from "react";
import { Table, Space, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import useGetData from "../custom-hooks/useGetData";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

const Users = () => {
  const { data: usersData, loading } = useGetData("users");

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "photoURL",
      key: "photoURL",
      render: (photoURL) => <img className="user__img" src={photoURL} alt="" />,
    },
    {
      title: "Username",
      dataIndex: "displayName",
      key: "displayName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteUser(record.uid)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <section>
      <Table columns={columns} dataSource={usersData} loading={loading} />
    </section>
  );
};

export default Users;
