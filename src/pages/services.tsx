import { NextPage } from "next";
import React, { useRef } from "react";
import { Container } from "../components/container";
import TopContainer from "../components/pageTopContainer";
import { client } from "../lib/contentful";
import { renderDocument } from "../components/document/renderDocument";
import { getImageURL } from "../helpers/getImageUrl";
import Button from "../components/button";
import TechnologyCard from "../components/technologyCard";
import { slideRight } from "../utils/animations";
import { useInView } from "framer-motion";
import WorkProcessCard from "../components/workProcessCard";
import ServiceCard from "../components/serviceCard";

interface PropsType {
  workProcess: any;
  pageData: any;
  technologies: any;
  services: any;
}

export async function getServerSideProps() {
  const _services = await client.getEntries({ content_type: "services" });
  const _workProcess = await client.getEntries({ content_type: "workProcess" });
  const _servicesPageData = await client.getEntries({
    content_type: "servicesPage",
  });
  const _technologies = await client.getEntries({
    content_type: "technologies",
  });

  return {
    props: {
      workProcess: _workProcess.items,
      pageData: _servicesPageData.items[0],
      technologies: _technologies.items[0].fields,
      services: _services.items,
    },
  };
}

const Services: NextPage<PropsType> = ({
  workProcess,
  pageData,
  technologies,
  services,
}) => {
  const { section1Title, section1, section2Title, section2, banner } =
    pageData.fields;

  const bannerUrl = getImageURL(banner);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const slideRightStyle = slideRight(isInView);

  return (
    <div>
      <TopContainer
        flexDirection="column"
        marginTop="-97px"
        bgImage={bannerUrl}
      >
        <div className="flex flex-col pt-[97px] justify-center content-center items-center lg:w-[80%] lg:flex-row">
          <div className="flex flex-col animate-slideUp justify-center items-center text-white lg:px-8 lg:w-[70%] space-y-8">
            <h1 className=" text-white text-mobileTitle sm:text-pageTitle font-extrabold text-center">
              {section1Title}
            </h1>
            <span className="text-bannerText text-center">
              {renderDocument(section1)}
            </span>
            <Button borderColor="white">Get In Touch</Button>
          </div>
        </div>
      </TopContainer>
      <Container>
        <div className="flex flex-col lg:w-[60vw] justify-center items-center gap-5  mx-min-5">
          <h1 className="text-mobileTitle md:text-title animate-slideRight">
            {section2Title}
          </h1>
          <span className="text-bannerText animate-fade text-justify lg:w-[45vw]">
            {renderDocument(section2)}
          </span>
        </div>
      </Container>
      <Container flexDirection="column">
        <div className="grid grid-cols-1 justify-center items-start gap-5 mt-10 sm:grid-cols-2 lg:grid-cols-3 mx-min-5">
          {services.map((service: any, index: number) => {
            return (
              <ServiceCard serviceData={service} index={index} key={index} />
            );
          })}
        </div>
      </Container>

      <div className="flex flex-col lg:flex-row justify-between w-screen items-center py-12 px-5 md:px-[5%] lg:px-[10%]  bg-hs-bg">
        <div
          ref={ref}
          style={slideRightStyle}
          className="rotate-6 mb-12  bg-hs-blue md:h-[150px] lg:h-[300px] rounded-lg"
        >
          <div className="flex justify-center items-center p-5 -rotate-6 rounded-lg bg-white w-full h-full shadow-lg">
            <h1 className="text-mobileTitle md:text-title">How We Do</h1>
          </div>
        </div>

        <div className=" w-full lg:w-1/2">
          {workProcess.map((phase: any, index: number) => {
            const { icon, title, subTitle, description } = phase.fields;
            return <WorkProcessCard phase={phase} key={index} index={index} />;
          })}
        </div>
      </div>
      <Container flexDirection="column">
        <h1 className="text-pageTitle mb-10">{technologies.title}</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 content-around">
          {technologies.icons.map((tech: any, index: number) => {
            return <TechnologyCard tech={tech} key={index} index={index} />;
          })}
        </div>
      </Container>
    </div>
  );
};

export default Services;
