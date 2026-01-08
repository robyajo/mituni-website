import PageConponentsAdmin from "@/components/admin/layout/page-components";
import MituniTable from "@/components/mitunitable";
import { BreadcrumbType } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};
export default function Page() {
  const breadcrumbs: BreadcrumbType[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      isCurrent: true,
    },
  ];
  return (
    <>
      <PageConponentsAdmin breadcrumb={breadcrumbs}>
        <MituniTable />
      </PageConponentsAdmin>
    </>
  );
}
