import React, { FC, useRef } from "react";
import { client } from "../lib/contentful";
import { renderDocument } from "../components/document/renderDocument";
import ClientsLogos from "../components/clients";
import { Container } from "../components/container";
import ServiceCard from "../components/serviceCard";
import TeamMemberCard from "../components/team/team.component";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import Button from "../components/button";
import { WorkCard, AllWorksCard } from "../components/workCard";
import { ProjectType, ServiceDataType } from "../../types";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { slideRight } from "../utils/animations";
import TopContainer from "../components/pageTopContainer";
import { getImageURL } from "src/helpers/getImageUrl";

interface PropsType {
  homepageData: any;
  services: ServiceDataType[];
  team: any;
  projects: ProjectType[];
}

export async function getServerSideProps() {
  const _homepageData = await client.getEntries({ content_type: "homepage" });
  const _team = await client.getEntries({ content_type: "team" });
  const _services = await client.getEntries({ content_type: "services" });
  const _projects = await client.getEntries({ content_type: "projects" });

  return {
    props: {
      homepageData: _homepageData.items[0],
      services: _services.items,
      team: _team.items,
      projects: _projects.items,
    },
  };
}

const Home: FC<PropsType> = ({ homepageData, services, team, projects }) => {
  const {
    Sec1LargeText,
    sec1SmallText,
    clientsLogosSectionTitle,
    clientsLogo,
    sec1bg,
    servicesSectionTitle,
    worksSectionTitle,
    teamSectionTitle,
  } = homepageData.fields;
  const imgURL = getImageURL(sec1bg[0]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const slideRightStyle = slideRight(isInView);

  return (
    <>
      {/* // Top Section */}
      <TopContainer height="100vh" bgImage={imgURL} marginTop="-97px">
        <div className="flex flex-col justify-center content-center items-center lg:flex-row">
          <motion.div className="flex flex-col justify-center  text-center  items-center   w-full h-auto md:h-[400px] lg:w-[80%] md:justify-center">
            <div>
              <h1
                ref={ref}
                style={slideRightStyle}
                className="font-semibold w-full items-center leading-tight text-white
        text-mobileTitle md:text-pageTitle"
              >
                {Sec1LargeText}
              </h1>
            </div>
            <div className="flex animate-slideLeft w-full text-[20px]  text-white mt-[40px]  md:w-[80%]">
              <span ref={ref} style={slideRightStyle}>
                {renderDocument(sec1SmallText)}
              </span>
            </div>
            <div className="flex mt-12 justify-center animate-fade content-center items-center w-full space-x-10">
              <Button borderColor="#FFFFFF    ">
                <Link href="/services">
                  <div className="flex md:space-x-2">
                    <p>Learn more </p>{" "}
                    <ArrowLongRightIcon className="h-6 w-6 text-white" />
                  </div>
                </Link>
              </Button>
              <Button bgColor="white" borderColor="#003B5C" textColor="#003B5C">
                <Link href="/contact">
                  <a>Contact us</a>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </TopContainer>
      {/* // Clients Logo Section */}
      <Container bgColor="#ecf1f8">
        <ClientsLogos
          clientsData={clientsLogo}
          clientsLogosSectionTitle={clientsLogosSectionTitle}
        />
      </Container>
      {/* // Services Section */}
      <Container flexDirection="column" title={servicesSectionTitle}>
        <motion.div className="grid grid-cols-1 justify-center items-start gap-5 mt-10 sm:grid-cols-2 lg:grid-cols-3 mx-min-5">
          {services.map((service: ServiceDataType, index: number) => {
            return (
              <ServiceCard serviceData={service} index={index} key={index} />
            );
          })}
        </motion.div>
        <Button borderColor="#003B5C" mt="50px">
          <Link href="/services">
            <a>Read more</a>
          </Link>
        </Button>
      </Container>
      <div className="w-full bg-gray-300 h-[1px]"></div>
      {/* // Works Section */}
      <Container flexDirection="column" title={worksSectionTitle}>
        <div className="grid grid-cols-1 w-full justify-center items-start gap-5 mt-10 md:grid-cols-2 lg:grid-cols-3 mx-min-5">
          {projects.map((project: ProjectType, index: number) => {
            return <WorkCard project={project} key={index} index={index} />;
          })}
          <AllWorksCard />
        </div>
      </Container>
      {/* // Team Section */}
      <Container
        flexDirection="column"
        bgColor="#ECF1F8"
        minHeight="600px"
        title={teamSectionTitle}
      >
        <motion.div className="grid grid-cols-1 justify-center items-start gap-5 mt-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-min-5">
          {team.map((member: any, index: number) => {
            return (
              <TeamMemberCard memberData={member} key={index} index={index} />
            );
          })}
        </motion.div>
      </Container>
    </>
  );
};
export default Home;
