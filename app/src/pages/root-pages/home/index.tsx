import AppLayout from "../../../components/ui/AppLayout";
import type { PageProps } from "../../_page-types";
import { Link } from "react-router";
import { PlaygroundPages } from "../../playground";
import { DebugPages } from "../../debug";

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

        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "var(--color-bg-sec)",
            border: "1px solid var(--color-border-main)",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ marginBottom: "15px" }}>Playground Demos</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {Object.values(PlaygroundPages).map((page) => (
              <li key={page.slug} style={{ marginBottom: "10px" }}>
                <Link 
                  to={`/${page.slug}`}
                  style={{ 
                    color: "var(--brand-color)", 
                    textDecoration: "none",
                    fontWeight: 600
                  }}
                >
                  {page.title} →
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "var(--color-bg-sec)",
            border: "1px solid var(--color-border-main)",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ marginBottom: "15px" }}>Debug Pages</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {Object.values(DebugPages).map((page) => (
              <li key={page.slug} style={{ marginBottom: "10px" }}>
                <Link 
                  to={`/${page.slug}`}
                  style={{ 
                    color: "var(--brand-color)", 
                    textDecoration: "none",
                    fontWeight: 600
                  }}
                >
                  {page.title} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppLayout>
  ),
};

export default Home;
