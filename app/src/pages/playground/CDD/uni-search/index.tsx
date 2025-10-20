import React from "react";
import AppLayout from "../../../../components/ui/AppLayout";
import type { PageProps } from "../../../_page-types";
import UniSearch from "./component";

const UniSearchPage: PageProps = {
  title: "Universal Search",
  slug: "uni-search",
  content: (
    <AppLayout isTesting={true}>
      <UniSearch />
    </AppLayout>
  ),
};

export default UniSearchPage;
