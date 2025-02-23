import React from "react";
import { MainHeader } from "./components/common";
import { Table } from "@/components/ui/tables";
import { Card, CardBody, CardTitle } from "@/components/ui/cards";
import { Button } from "@/components/ui/buttons";
import Switch from "@/components/ui/switch/switch";

import axios from "axios";

const columns = [
  { header: "Full Name", key: "fullName", render: (item) => item.fullName },
  { header: "Email", key: "email", render: (item) => item.email },
  { header: "Phone", key: "phone", render: (item) => item.phone },
  { header: "Zip Code", key: "zipCode", render: (item) => item.zipCode },
  {
    header: "Current Order",
    key: "currentOrder",
    render: (item) => item.currentOrder,
  },
  {
    header: "Actions",
    key: "actions",
    render: (item) => (
      <div className="flex gap-2">
        <Button size="sm" color="primary">
          Edit
        </Button>
        <Button size="sm" color="error">
          Delete
        </Button>
        <Switch
          checked={item.active}
          onChange={() => handleBlockUser(item._id, !item.active)}
          label={item.active ? "Unblock" : "Block"}
        />
      </div>
    ),
  },
];

// Dummy data updated with _id and active fields
const users = [
  {
    _id: "1",
    fullName: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "555-1234",
    zipCode: "90210",
    currentOrder: "Order #101",
    active: true,
  },
  {
    _id: "2",
    fullName: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "555-5678",
    zipCode: "10001",
    currentOrder: "Order #102",
    active: true,
  },
  {
    _id: "3",
    fullName: "Carol Lee",
    email: "carol.lee@example.com",
    phone: "555-8765",
    zipCode: "30301",
    currentOrder: "Order #103",
    active: true,
  },
  {
    _id: "4",
    fullName: "David Brown",
    email: "david.brown@example.com",
    phone: "555-4321",
    zipCode: "60601",
    currentOrder: "Order #104",
    active: true,
  },
  {
    _id: "5",
    fullName: "Eva Green",
    email: "eva.green@example.com",
    phone: "555-9876",
    zipCode: "80202",
    currentOrder: "Order #105",
    active: true,
  },
];

const handleBlockUser = async (userId, active) => {
  try {
    await axios.put(`/api/users/block/${userId}`, { active });
    // Update local state or refetch users here if using real data
    console.log(`User ${userId} ${active ? "unblocked" : "blocked"}`);
  } catch (error) {
    console.error("Failed to block/unblock user:", error);
  }
};

const UsersPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <MainHeader
        title="Users"
        subTitle="This is the users page. For adding and removing users"
      />
      <Card>
        <div className="flex justify-between items-center">
          <CardTitle>Users Listing</CardTitle>
          <Button type="button" color="primary">
            Add User
          </Button>
        </div>
        <CardBody>
          <Table data={users} columns={columns} />
        </CardBody>
      </Card>
    </div>
  );
};

export default UsersPage;
