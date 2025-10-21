'use client';

import UpdatePartnerAccount from "@/components/partner/update-account/page";
import PartnersAccount from "@/components/partner/partner-account/page";
import Tab from "@/components/tabs/page";

const Settings = () => {
  const settingsTypes = ["Account Details","Update Account"];

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Settings</h2>
      <div className="w-full">
        <Tab
          titles={settingsTypes}
          renderContent={(type) =>
            type === "Account Details" ? <PartnersAccount/> : <UpdatePartnerAccount />
          }
        />
      </div>
    </div>
  );
};

export default Settings;
