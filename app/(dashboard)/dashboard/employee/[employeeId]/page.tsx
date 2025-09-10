import BreadCrumb from "@/components/breadcrumb";
import { ProductForm } from "@/components/forms/product-form";
import React from "react";

/**
 * The page for creating a new employee.
 * @returns {JSX.Element} The page for creating a new employee.
 */
export default function Page() {
  const breadcrumbItems = [
    { title: "Employee", link: "/dashboard/employee" },
    { title: "Create", link: "/dashboard/employee/create" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <ProductForm
        categories={[
          { _id: "shirts", name: "shirts" },
          { _id: "pants", name: "pants" },
        ]}
        initialData={null}
        key={null}
      />
    </div>
  );
}
