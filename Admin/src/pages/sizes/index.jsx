import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { getSizes } from "@/api/sizes";
import { Card, CardBody, CardTitle } from "@/components/ui/cards";
import { Table } from "@/components/ui/tables";
import { Button } from "@/components/ui/buttons";
import { Dialog } from "@/components/ui/dialog";
import { DeleteCrustModal } from "../components/crusts";
import { MainHeader } from "../components/common";
import { EditActionButton } from "@/components/ui/buttons";
import { DeleteSizesModal } from "../components/sizes/deleteSizesModal";

const SizesLanding = () => {
  const navigate = useNavigate();
  const [sizes, setSizes] = useState([]);

  const columns = useMemo(
    () => [
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
        header: "Actions",
        key: "actions",
        render: (item) => (
          <div className="flex gap-2">
            <EditActionButton path={`/home/sizes/edit/${item._id}`} />
            <DeleteSizesModal
              id={item._id}
              setSizes={setSizes}
              getSizes={getSizes}
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
        const data = await getSizes();
        setSizes(data);
      } catch (error) {
        console.error("Failed to fetch Data:", error);
      }
    };
    fetchCrusts();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <MainHeader title="Sizes" subTitle="Manage your pizza sizes here." />
      <Card>
        <div className="flex justify-between items-center">
          <CardTitle>Sizes Listing</CardTitle>
          <Button
            type="button"
            color="primary"
            onClick={() => navigate("/home/sizes/add")}
          >
            Add Crust
          </Button>
        </div>
        <CardBody>
          <Dialog />
          <Table data={sizes} columns={columns} />
        </CardBody>
      </Card>
    </div>
  );
};

export default SizesLanding;

// clearInterval();

// const INPUTS_INITIAL_VALUES = {
//   price: "",
//   size: "",
// };

// function AllSizesPage() {
//   const [inputs, setInputs] = useState([INPUTS_INITIAL_VALUES]);
//   const [counter, setCounter] = useState(0);

//   const addItem = () => {
//     setInputs((prev) => [...prev, INPUTS_INITIAL_VALUES]);
//   };

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCounter((prev) => prev + 1);
//     }, 1 * 1000);

//     return () => clearInterval(intervalId);
//   }, [counter]);

//   const saveSizes = () => console.log(inputs);
//   return (
//     <div className="flex flex-col gap-8 bg-card border border-border rounded-lg p-5 shadow min-h-[400px]">
//       <div className="text-end">
//         <Button color="outline-primary" onClick={addItem}>
//           Add More
//         </Button>
//       </div>
//       <div className="flex-grow flex flex-col gap-5">
//         {inputs.map((input, idx) => (
//           <div key={idx} className="flex gap-2 items-center">
//             <div className="flex flex-col gap-1 w-full">
//               <label className="font-semibold text-sm text-foreground">
//                 Size
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter size"
//                 className="border border-border px-3 py-2 placeholder:text-muted-foreground placeholder:text-sm rounded-lg"
//               />
//             </div>
//             <div className="flex flex-col gap-1 w-full">
//               <label className="font-semibold text-sm text-foreground">
//                 Price
//               </label>
//               <input
//                 type="number"
//                 placeholder="Enter price"
//                 className="border border-border px-3 py-2 placeholder:text-muted-foreground placeholder:text-sm rounded-lg"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="text-center">
//         <Button type="submit" onClick={saveSizes}>
//           Save
//         </Button>
//       </div>

//       <div>{counter}</div>
//     </div>
//   );
// }

// export default AllSizesPage;
