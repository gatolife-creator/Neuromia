import { PageTitle } from "@/components/page-title";
import { Toggle } from "../../components/toggle-button";

export default function Settings() {
  return (
    <div>
      <PageTitle>設定</PageTitle>
      <div className="p-4 space-y-5">
        <div className="flex">
          リマインダー
          <Toggle />
        </div>
        <div className="flex">
          リマインダー
          <Toggle />
        </div>
        <div className="flex">
          リマインダー
          <Toggle />
        </div>
      </div>
    </div>
  );
}
