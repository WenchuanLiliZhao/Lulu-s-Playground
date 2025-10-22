import { useState } from "react";
import AppLayout from "../../../components/ui/AppLayout";
import { IconButton } from "../../../components/ui/IconButton";
import type { PageProps } from "../../_page-types";

const IconButtonDebug = () => {
  const [clickCount, setClickCount] = useState(0);
  const [lastClicked, setLastClicked] = useState<string>("");

  const handleClick = (buttonName: string) => {
    setClickCount((prev) => prev + 1);
    setLastClicked(buttonName);
    console.log("Button clicked:", buttonName);
  };

  const resetCounter = () => {
    setClickCount(0);
    setLastClicked("");
  };

  // Common icons for demonstration
  const commonIcons = [
    "close",
    "add",
    "remove",
    "edit",
    "delete",
    "search",
    "menu",
    "settings",
    "home",
    "favorite",
    "star",
    "share",
    "open_in_full",
    "expand_content",
    "arrow_back",
    "arrow_forward",
  ];

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "32px" }}>IconButton Component Debug</h1>

      {/* Click Info Display */}
      <div
        style={{
          marginBottom: "40px",
          padding: "16px",
          backgroundColor: "var(--color-bg-sec-trans)",
          borderRadius: "8px",
          border: "1px solid var(--color-border-main-trans)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ marginTop: 0 }}>Click Information</h3>
          <button
            onClick={resetCounter}
            style={{
              padding: "6px 12px",
              backgroundColor: "var(--color-semantic-active)",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Reset Counter
          </button>
        </div>
        <p>
          <strong>Last Clicked:</strong> {lastClicked || "None"}
        </p>
        <p>
          <strong>Total Clicks:</strong> {clickCount}
        </p>
      </div>

      {/* Variants */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "16px" }}>Variants</h2>
        <p style={{ marginBottom: "16px", color: "var(--color-neg)", fontSize: "14px" }}>
          All available button variants with different visual styles.
        </p>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <IconButton
              icon="close"
              variant="default"
              onClick={() => handleClick("Default variant")}
            />
            <span style={{ fontSize: "12px", color: "var(--color-neg)" }}>Default</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <IconButton
              icon="add"
              variant="primary"
              onClick={() => handleClick("Primary variant")}
            />
            <span style={{ fontSize: "12px", color: "var(--color-neg)" }}>Primary</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <IconButton
              icon="menu"
              variant="ghost"
              onClick={() => handleClick("Ghost variant")}
            />
            <span style={{ fontSize: "12px", color: "var(--color-neg)" }}>Ghost</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <IconButton
              icon="open_in_full"
              variant="outline"
              onClick={() => handleClick("Outline variant")}
            />
            <span style={{ fontSize: "12px", color: "var(--color-neg)" }}>Outline</span>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "16px" }}>Sizes</h2>
        <p style={{ marginBottom: "16px", color: "var(--color-neg)", fontSize: "14px" }}>
          Three available sizes: Small (24px), Medium (32px), and Large (40px).
        </p>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <IconButton
              icon="star"
              size="small"
              variant="primary"
              onClick={() => handleClick("Small size")}
            />
            <span style={{ fontSize: "12px", color: "var(--color-neg)" }}>Small</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <IconButton
              icon="star"
              size="medium"
              variant="primary"
              onClick={() => handleClick("Medium size")}
            />
            <span style={{ fontSize: "12px", color: "var(--color-neg)" }}>Medium</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <IconButton
              icon="star"
              size="large"
              variant="primary"
              onClick={() => handleClick("Large size")}
            />
            <span style={{ fontSize: "12px", color: "var(--color-neg)" }}>Large</span>
          </div>
        </div>
      </section>

      {/* Disabled State */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "16px" }}>Disabled State</h2>
        <p style={{ marginBottom: "16px", color: "var(--color-neg)", fontSize: "14px" }}>
          Disabled buttons have reduced opacity and cannot be clicked.
        </p>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <IconButton icon="close" variant="default" disabled />
          <IconButton icon="add" variant="primary" disabled />
          <IconButton icon="menu" variant="ghost" disabled />
          <IconButton icon="open_in_full" variant="outline" disabled />
        </div>
      </section>

      {/* Common Icons Grid */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "16px" }}>Common Icons</h2>
        <p style={{ marginBottom: "16px", color: "var(--color-neg)", fontSize: "14px" }}>
          Frequently used Material Icons in default variant.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "24px" }}>
          {commonIcons.map((icon) => (
            <div
              key={icon}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <IconButton
                icon={icon}
                onClick={() => handleClick(icon)}
              />
              <span style={{ fontSize: "12px", color: "var(--color-neg)", textAlign: "center" }}>
                {icon}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Variant Comparison Matrix */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "16px" }}>Variant × Size Matrix</h2>
        <p style={{ marginBottom: "16px", color: "var(--color-neg)", fontSize: "14px" }}>
          All combinations of variants and sizes.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "120px repeat(3, 1fr)",
            gap: "16px",
            alignItems: "center",
          }}
        >
          {/* Header row */}
          <div></div>
          <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "14px" }}>Small</div>
          <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "14px" }}>Medium</div>
          <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "14px" }}>Large</div>

          {/* Default row */}
          <div style={{ fontWeight: "bold", fontSize: "14px" }}>Default</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton icon="settings" size="small" variant="default" onClick={() => handleClick("Default small")} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton icon="settings" size="medium" variant="default" onClick={() => handleClick("Default medium")} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton icon="settings" size="large" variant="default" onClick={() => handleClick("Default large")} />
          </div>

          {/* Primary row */}
          <div style={{ fontWeight: "bold", fontSize: "14px" }}>Primary</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton icon="favorite" size="small" variant="primary" onClick={() => handleClick("Primary small")} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton icon="favorite" size="medium" variant="primary" onClick={() => handleClick("Primary medium")} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton icon="favorite" size="large" variant="primary" onClick={() => handleClick("Primary large")} />
          </div>

          {/* Ghost row */}
          <div style={{ fontWeight: "bold", fontSize: "14px" }}>Ghost</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton icon="share" size="small" variant="ghost" onClick={() => handleClick("Ghost small")} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton icon="share" size="medium" variant="ghost" onClick={() => handleClick("Ghost medium")} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton icon="share" size="large" variant="ghost" onClick={() => handleClick("Ghost large")} />
          </div>

          {/* Outline row */}
          <div style={{ fontWeight: "bold", fontSize: "14px" }}>Outline</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton icon="edit" size="small" variant="outline" onClick={() => handleClick("Outline small")} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton icon="edit" size="medium" variant="outline" onClick={() => handleClick("Outline medium")} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton icon="edit" size="large" variant="outline" onClick={() => handleClick("Outline large")} />
          </div>
        </div>
      </section>

      {/* Practical Examples */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ marginBottom: "16px" }}>Practical Examples</h2>
        
        {/* Navigation Bar */}
        <div style={{ marginBottom: "32px" }}>
          <h3 style={{ marginBottom: "12px", fontSize: "16px" }}>Navigation Bar</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              backgroundColor: "var(--color-bg-sec)",
              borderRadius: "8px",
            }}
          >
            <IconButton icon="menu" variant="ghost" onClick={() => handleClick("Nav menu")} />
            <div style={{ display: "flex", gap: "8px" }}>
              <IconButton icon="search" variant="ghost" onClick={() => handleClick("Nav search")} />
              <IconButton icon="favorite" variant="ghost" onClick={() => handleClick("Nav favorite")} />
              <IconButton icon="settings" variant="ghost" onClick={() => handleClick("Nav settings")} />
            </div>
          </div>
        </div>

        {/* Card Header */}
        <div style={{ marginBottom: "32px" }}>
          <h3 style={{ marginBottom: "12px", fontSize: "16px" }}>Card Header with Actions</h3>
          <div
            style={{
              padding: "16px",
              backgroundColor: "var(--color-bg-sec)",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h4 style={{ margin: 0 }}>Card Title</h4>
              <div style={{ display: "flex", gap: "4px" }}>
                <IconButton icon="edit" size="small" variant="outline" onClick={() => handleClick("Edit card")} />
                <IconButton icon="delete" size="small" variant="outline" onClick={() => handleClick("Delete card")} />
                <IconButton icon="close" size="small" variant="ghost" onClick={() => handleClick("Close card")} />
              </div>
            </div>
            <p style={{ margin: 0, color: "var(--color-neg)", fontSize: "14px" }}>Card content goes here...</p>
          </div>
        </div>

        {/* Floating Action Button */}
        <div style={{ marginBottom: "32px" }}>
          <h3 style={{ marginBottom: "12px", fontSize: "16px" }}>Floating Action Button</h3>
          <div style={{ position: "relative", height: "120px", backgroundColor: "var(--color-bg-sec)", borderRadius: "8px", padding: "16px" }}>
            <p style={{ color: "var(--color-neg)", fontSize: "14px" }}>Main content area...</p>
            <div style={{ position: "absolute", bottom: "16px", right: "16px" }}>
              <IconButton icon="add" size="large" variant="primary" onClick={() => handleClick("FAB add")} />
            </div>
          </div>
        </div>
      </section>

      {/* Usage Instructions */}
      <section
        style={{
          marginTop: "64px",
          padding: "24px",
          backgroundColor: "var(--color-bg-sec-trans)",
          borderRadius: "8px",
        }}
      >
        <h2>Usage Instructions</h2>
        <ul>
          <li>
            <strong>Variants:</strong> Choose from default, primary, ghost, or outline based on visual hierarchy
          </li>
          <li>
            <strong>Sizes:</strong> Small (24px) for compact spaces, Medium (32px) for general use, Large (40px) for prominent actions
          </li>
          <li>
            <strong>Icons:</strong> Use Material Symbols icon names from{" "}
            <a
              href="https://fonts.google.com/icons"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-semantic-active)" }}
            >
              Google Fonts Icons
            </a>
          </li>
          <li>
            <strong>Hover Effects:</strong> All variants include scale animation (1.05x) and background color changes
          </li>
          <li>
            <strong>Focus States:</strong> Keyboard navigation is supported with visible focus outlines
          </li>
          <li>
            <strong>Accessibility:</strong> Always provide <code>aria-label</code> for screen readers
          </li>
        </ul>
      </section>
    </div>
  );
};

const IconButtonDebugPage: PageProps = {
  title: "IconButton Debug",
  slug: "debug-iconbutton",
  content: (
    <AppLayout isTesting={true}>
      <IconButtonDebug />
    </AppLayout>
  ),
};

export default IconButtonDebugPage;

