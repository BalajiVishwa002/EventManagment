import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "./components/navbar/navbar";
import AdminSessionProvider from "./components/adminSessionProvider";

export default async function AdminLayouts({ children }) {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div style={{ width: "100%" }}>
        <Navbar />
      <AdminSessionProvider>
        {children}
      </AdminSessionProvider>
    </div>
  );
}
