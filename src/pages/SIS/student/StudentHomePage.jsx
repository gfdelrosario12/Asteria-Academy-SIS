import React from "react";
import Layout from "../../../Layout";
import DropdownMenu from "../components/DropdownMenu";

function StudentHomePage() {
  const dropdownItems1 = ["Action 1", "Another action 1", "Something else here 1"];
  const dropdownItems2 = ["Action 2", "Another action 2", "Something else here 2"];
  const dropdownItems3 = ["Action 3", "Another action 3", "Something else here 3"];
  const dropdownItems4 = ["Action 4", "Another action 4", "Something else here 4"];

  // All links set to the dummy URL /SIS/student/grades
  const dropdownItemsLinks = ["/SIS/student/grades", "/SIS/student/grades", "/SIS/student/grades"];

  return (
    <div>
      <Layout>
        <h1 className="text-center parent-font">Welcome Student, Name!</h1>
        <div className="d-flex flex-column justify-content-between">
          <DropdownMenu title="Dropdown 1" items={dropdownItems1} links={dropdownItemsLinks} />
          <DropdownMenu title="Dropdown 2" items={dropdownItems2} links={dropdownItemsLinks} />
          <DropdownMenu title="Dropdown 3" items={dropdownItems3} links={dropdownItemsLinks} />
          <DropdownMenu title="Dropdown 4" items={dropdownItems4} links={dropdownItemsLinks} />
        </div>
      </Layout>
    </div>
  );
}

export default StudentHomePage;
