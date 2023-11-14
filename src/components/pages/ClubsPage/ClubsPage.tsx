import { CustomHeader } from "@src/components/common";
import React from "react";
import { AddSkillSection, ClubRanksList } from "./components";
import { Club as ClubSchema } from "@prisma/client";

const MainPage = () => {
  const [clubs, setClubs] = React.useState([] as ClubSchema[]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchClubs = async () => {
      const response = await fetch("/api/clubs");
      const clubs = (await response.json())
        .clubs as ClubSchema[];

      setIsLoading(false);
      setClubs(clubs);
    };
    fetchClubs();
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
            setClubs={setClubs}
          />
        </div>
        <div className="w-75">
          <h2 className="m-3 text-center text-white">Clubs List</h2>

          <hr className="mx-3" />
          <ClubRanksList clubs={clubs} isLoading={isLoading} />
        </div>
      </section>
    </>
  );
};

export default MainPage;
