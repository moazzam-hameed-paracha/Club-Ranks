import { CustomHeader } from "@src/components/common";
import React from "react";
import { AddSkillSection, ClassRanksList } from "./components";
import { Class as ClassSchema } from "@prisma/client";
import { APIS } from "@src/constants/api";

const ClassPage = () => {
  const [classes, setClasses] = React.useState([] as ClassSchema[]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchClasses = async () => {
      const response = await fetch(APIS.CLASSES);
      const classes = (await response.json())
        .classes as ClassSchema[];

      setIsLoading(false);
      setClasses(classes);
    };
    fetchClasses();
  }, []);

  return (
    <>
      <CustomHeader />

      <section className="p-3 d-flex gap-3">
        <div
          className="w-25 d-flex flex-column gap-3"
          style={{ marginTop: "88px" }}
        >
          <AddSkillSection
            setIsLoading={setIsLoading}
            setClasses={setClasses}
          />
        </div>
        <div className="w-75">
          <h2 className="m-3 text-center text-white">Class List</h2>

          <hr className="mx-3" />
          <ClassRanksList classes={classes} isLoading={isLoading} />
        </div>
      </section>
    </>
  );
};

export default ClassPage;
