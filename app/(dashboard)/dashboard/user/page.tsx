import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/user-tables/client";
import { users } from "@/constants/data";

/**
 * The breadcrumb items for the user page.
 */
const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];

/**
 * The user page.
 * @returns {JSX.Element} The user page.
 */
export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={users} />
      </div>
    </>
  );
}
