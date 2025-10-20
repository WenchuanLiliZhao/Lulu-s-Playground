import AppLayout from "../../../../components/ui/AppLayout";
import type { PageProps } from "../../../_page-types";
import DataDictionary from "./component";

const DataDictionaryPage: PageProps = {
  title: "Data Dictionary",
  slug: "data-dictionary",
  content: (
    <AppLayout isTesting={true}>
      <DataDictionary />
    </AppLayout>
  ),
};

export default DataDictionaryPage;

