import { useNavigate } from "react-router-dom";
import { MainHeader } from "../components/common";
import { Card, CardBody, CardTitle } from "@/components/ui/cards";
import { Table } from "@/components/ui/tables";
import { Button, EditActionButton } from "@/components/ui/buttons";
import { useEffect } from "react";
import { getProducts } from "@/api/products";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { DeleteProductsModal } from "../components/products";
import { useMemo } from "react";

const AllProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const columns = useMemo(
    () => [
      {
        header: "Image",
        key: "image",
        render: (item) => (
          <img
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.title}
            className="w-8 h-4 object-cover"
          />
        ),
      },
      {
        header: "Title",
        key: "title",
        render: (item) => item.title,
      },
      {
        header: "Description",
        key: "description",
        render: (item) => item.description,
      },
      {
        header: "Sizes",
        key: "sizes",
        render: (item) =>
          item.sizes
            .map((size) => `${size.sizeId.name} - £${size.price}`)
            .join(", "),
      },
      {
        header: "Actions",
        key: "actions",
        render: (item) => (
          <div className="flex gap-1 items-center">
            <EditActionButton path={`/home/products/edit/${item._id}`} />
            <DeleteProductsModal
              id={item._id}
              setProducts={setProducts}
              getProducts={getProducts}
            />
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <MainHeader
        title="Products"
        subTitle="In this page, you can manage different products showcased in your store."
      />
      <Card>
        <div className="flex justify-between items-center">
          <CardTitle>Products Listing</CardTitle>
          <Button
            type="button"
            color="primary"
            onClick={() => navigate("/home/products/add")}>
            Add Product
          </Button>
        </div>
        <CardBody>
          <Dialog />
          <Table data={products} columns={columns} />
        </CardBody>
      </Card>
    </div>
  );
};

export default AllProductsPage;
