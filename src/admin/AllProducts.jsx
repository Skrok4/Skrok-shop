import React from "react";
import { Row, Col, Table, Image, Button, Space } from "antd";
import { Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase-config";
import { doc, deleteDoc } from "firebase/firestore";
import useGetData from "../custom-hooks/useGetData";
import { DeleteOutlined } from "@ant-design/icons";
import "./elements.scss";

const AllProducts = () => {
  const { data: productsData, loading } = useGetData("products");

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    toast.success("Deleted");
  };

  return (
    <section>
      <Container>
        <Row>
          <Col span={24}>
            <Table dataSource={productsData} loading={loading}>
              <Table.Column
                title="Image"
                dataIndex="imgUrl"
                key="imgUrl"
                className="w-60 h-60"
                render={(imgUrl) => (
                  <Image src={imgUrl} className="product__img" />
                )}
              />
              <Table.Column
                title="Title"
                dataIndex="productName"
                key="productName"
              />
              <Table.Column
                title="Category"
                dataIndex="category"
                key="category"
              />
              <Table.Column
                title="Price"
                dataIndex="price"
                key="price"
                render={(price) => `$${price}`}
              />
              <Table.Column
                title="Actions"
                key="actions"
                render={(text, record) => (
                  <Space size="middle">
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => deleteProduct(record.id)}
                    >
                      Delete
                    </Button>
                  </Space>
                )}
              />
            </Table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
