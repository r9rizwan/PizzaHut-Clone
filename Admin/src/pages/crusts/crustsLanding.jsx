import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { getCrusts } from "@/api/crusts";
import { Card, CardBody, CardTitle } from "@/components/ui/cards";
import { Table } from "@/components/ui/tables";
import { Button } from "@/components/ui/buttons";
import { Dialog } from "@/components/ui/dialog";
import { DeleteCrustModal } from "../components/crusts";
import { MainHeader } from "../components/common";
import { EditActionButton } from "@/components/ui/buttons";

const CrustLanding = () => {
  const navigate = useNavigate();
  const [crusts, setCrusts] = useState([]);

  const columns = useMemo(
    () => [
      {
        header: "Image",
        key: "image",
        render: (item) => (
          <img
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.name}
            className="w-8 h-8 object-cover"
          />
        ),
      },
      {
        header: "Name",
        key: "name",
        render: (item) => item.name,
      },
      {
        header: "Description",
        key: "description",
        render: (item) => item.description,
      },
      {
        header: "Addon Price",
        key: "addonPrice",
        render: (item) => `£${item.addonPrice}`,
      },
      {
        header: "Actions",
        key: "actions",
        render: (item) => (
          <div className="flex gap-2">
            <EditActionButton path={`/home/crusts/edit/${item._id}`} />
            <DeleteCrustModal
              id={item._id}
              setCrusts={setCrusts}
              getCrusts={getCrusts}
            />
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const fetchCrusts = async () => {
      try {
        const data = await getCrusts();
        setCrusts(data);
      } catch (error) {
        console.error("Failed to fetch crusts:", error);
      }
    };
    fetchCrusts();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <MainHeader title="Crusts" subTitle="Manage your pizza crusts here." />
      <Card>
        <div className="flex justify-between items-center">
          <CardTitle>Crusts Listing</CardTitle>
          <Button
            type="button"
            color="primary"
            onClick={() => navigate("/home/crusts/add")}>
            Add Crust
          </Button>
        </div>
        <CardBody>
          <Dialog />
          <Table data={crusts} columns={columns} />
        </CardBody>
      </Card>
    </div>
  );
};

export default CrustLanding;
