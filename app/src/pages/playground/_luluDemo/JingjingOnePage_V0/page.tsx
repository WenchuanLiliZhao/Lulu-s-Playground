import AppLayout from "../../../../components/ui/AppLayout";
import type { PageProps } from "../../../_page-types";
import JingjingOnePageV0View from "./view";

const JingjingOnePage_V0: PageProps = {
  title: "JingJing One Page V0",
  slug: "tech-data-one-page-numbers-all-in-one",
  content: (
    <AppLayout
      isTesting={true}
      viewportMode={["scaled-from", 1800, 1225]}
      enableFrame={true}
      rulerSizes={[64, 64, 64, 64]}
      frameBackground="var(--color-abssy)"
    >
      <JingjingOnePageV0View />
    </AppLayout>
  ),
};

export default JingjingOnePage_V0;


