import AppLayout from "../../../components/ui/AppLayout/_component";
import type { PageProps } from "../../_page-types";

const Home: PageProps = {
  title: "Home",
  slug: "",
  content: (
    <AppLayout isTesting={true}>
      <div style={{ padding: "20px" }}>
        <h1>Home Page (Inside AppLayout)</h1>
        <p>This content is inside AppLayout and should change theme.</p>
        <p>Text color should change between light and dark mode.</p>
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "var(--color-bg-sec)",
            border: "1px solid var(--color-border-main)",
            borderRadius: "8px",
          }}
        >
          <p>This box uses theme CSS variables:</p>
          <ul>
            <li>Background: var(--color-bg-sec)</li>
            <li>Border: var(--color-border-main)</li>
            <li>Text: var(--color-text-main)</li>
          </ul>
        </div>
      </div>
    </AppLayout>
  ),
};

export default Home;
