import React, { useState } from "react";
import { Row, Col, Form, Input, Select, Button, Upload, message } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../firebase-config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const { Option } = Select;

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addProduct = async (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    setLoading(true);

    try {
      const docRef = await collection(db, "products");
      const storageRef = ref(
        storage,
        `productImages/${Date.now() + enterPrice}`
      );
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          setLoading(false);
          message.error("Images not uploaded");
          console.error(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(docRef, {
            productName: enterTitle,
            shortDesc: enterShortDesc,
            description: enterDescription,
            price: enterPrice,
            category: enterCategory,
            imgUrl: downloadURL,
          });
          setLoading(false);
          toast.success("Product successfully added!");
          navigate("/dashboard/all-products");
        }
      );
    } catch (error) {
      setLoading(false);
      toast.error("Product not added");
    }
  };

  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setEnterProductImg(info.file.originFileObj);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    } else if (info.file.type !== "image/png") {
      message.error("File must be in PNG format");
    }
  };

  const handlePriceChange = (value) => {
    setEnterPrice(value);
  };

  return (
    <section>
      <Row justify="center">
        <Col xs={24} md={16} lg={12} style={{ paddingTop: "2rem" }}>
          <h4 className="mb-4">Add Product</h4>
          <Form onFinish={addProduct}>
            <Form.Item label="Product title">
              <Input
                placeholder="Double sofa"
                value={enterTitle}
                onChange={(e) => setEnterTitle(e.target.value)}
                required
              />
            </Form.Item>

            <Form.Item label="Short Description">
              <Input
                placeholder="Short Description..."
                value={enterShortDesc}
                onChange={(e) => setEnterShortDesc(e.target.value)}
                required
              />
            </Form.Item>

            <Form.Item label="Description">
              <Input.TextArea
                placeholder="Description..."
                value={enterDescription}
                onChange={(e) => setEnterDescription(e.target.value)}
                required
              />
            </Form.Item>

            <Row gutter={16}>
              <Col sm={12}>
                <Form.Item label="Price">
                  <Input
                    type="number"
                    placeholder="$100"
                    value={enterPrice}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    required
                  />
                </Form.Item>
              </Col>

              <Col sm={12}>
                <Form.Item label="Category">
                  <Select
                    value={enterCategory}
                    onChange={(value) => setEnterCategory(value)}
                    required
                  >
                    <Option value="">Select Category</Option>
                    <Option value="chair">Chair</Option>
                    <Option value="sofa">Sofa</Option>
                    <Option value="table">Table</Option>
                    <Option value="bed">Bed</Option>
                    <Option value="desk">Desk</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Product Image">
              <Upload
                onChange={handleUploadChange}
                showUploadList={true}
                beforeUpload={() => false}
                required
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item className="d-flex justify-content-center">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="d-flex align-items-center py-4 px-4"
              >
                <PlusOutlined />
                Add Product
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </section>
  );
};

export default AddProducts;
