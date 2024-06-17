import React from "react";
import DropdownMenu from "../components/DropdownMenu";
import Layout from "../../../Layout";

function AdministratorHomePage() {
  const dropdownItems1 = ["Action 1", "Another action 1", "Something else here 1"];
  const dropdownItems2 = ["Action 2", "Another action 2", "Something else here 2"];
  const dropdownItems3 = ["Action 3", "Another action 3", "Something else here 3"];
  const dropdownItems4 = ["Action 4", "Another action 4", "Something else here 4"];

  return (
    <div>
      <Layout>
        <h1>Dropdown Example</h1>
        <div className="d-flex justify-content-between">
          <DropdownMenu title="Dropdown 1" items={dropdownItems1} />
          <DropdownMenu title="Dropdown 2" items={dropdownItems2} />
          <DropdownMenu title="Dropdown 3" items={dropdownItems3} />
          <DropdownMenu title="Dropdown 4" items={dropdownItems4} />
        </div>
      </Layout>
    </div>
  );
}

export default AdministratorHomePage;
