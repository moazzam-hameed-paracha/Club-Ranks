import {
  CustomHeader,
  LogoCarousel,
  DashboardCard,
} from "@src/components/common";
import React from "react";
import { FaUsers, FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";

const DashboardPage = () => {
  return (
    <>
      <CustomHeader />
      <section
        className="p-3 d-flex flex-column justify-content-between align-items-center"
        style={{
          minHeight: "calc(100vh - 86px)",
        }}
      >
        <div className="container mb-3">
          {/* <h2 className="text-center text-white mt-4">
            Universities
          </h2> */}
          {/* <hr /> */}
          <div className="mb-4">
            <LogoCarousel images={IMAGES} />
          </div>
        </div>

        <div className="container">
          <hr />
        </div>

        <div className="container mx-auto mb-4">
          <h2 className="text-center text-white">
            Discover where you belong with EDUNOT!
          </h2>
          <hr />
          <div className="text-white lead">
            Embark on a personalized academic adventure tailored just for you.
            Our platform is designed to seamlessly integrate your unique
            interests and academic CV to match you with the ideal clubs,
            mentors, and coursework. Dive into a world where your education is
            more than just classes; it’s about the connections you make, the
            mentors who inspire, and the experiences that shape your future.
            Begin the journey to a fulfilling university life that resonates
            with your individual aspirations and academic endeavors.
          </div>
        </div>
        <div className="container">
          <h2 className="text-center text-white mt-2">Features</h2>
          <hr />
          <div className="d-flex gap-4 justify-content-evenly">
            <DashboardCard
              title="Find Your Community"
              subtitle="Connect with clubs that match your passions and interests."
              icon={<FaUsers size={96} />}
            />
            <DashboardCard
              title="Explore Mentorship"
              subtitle="Discover professors whose research aligns with your academic goals."
              icon={<FaChalkboardTeacher size={96} />}
            />
            <DashboardCard
              title="Tailor Your Learning"
              subtitle="Select classes that will pave the path for your future career."
              icon={<FaBookOpen size={96} />}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;

const IMAGES = [
  {
    src: "/images/universities/brown.png",
    alt: "1",
  },
  {
    src: "/images/universities/columbia.png",
    alt: "1",
  },
  {
    src: "/images/universities/cornell.png",
    alt: "1",
  },
  {
    src: "/images/universities/dartmouth.png",
    alt: "1",
  },
  {
    src: "/images/universities/harvard.png",
    alt: "1",
  },
  {
    src: "/images/universities/princeton.png",
    alt: "1",
  },
  {
    src: "/images/universities/upenn.png",
    alt: "1",
  },
  {
    src: "/images/universities/yale.png",
    alt: "1",
  },
];
