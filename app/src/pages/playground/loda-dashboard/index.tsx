import AppLayout from "../../../components/ui/AppLayout";
import type { PageProps } from "../../_page-types";

const LodaDashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Loda Dashboard</h1>
      <p>Dashboard content coming soon...</p>
    </div>
  );
};

const LodaDashboardPage: PageProps = {
  title: "Loda Dashboard",
  slug: "loda-dashboard",
  content: (
    <AppLayout isTesting={true}>
      <LodaDashboard />
    </AppLayout>
  ),
};

export default LodaDashboardPage;

