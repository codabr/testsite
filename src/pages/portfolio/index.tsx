import { NextPage } from "next";
import React from "react";
import TopContainer from "../../components/pageTopContainer";
import { client } from "../../lib/contentful";
import { renderDocument } from "../../components/document/renderDocument";
import { getImageURL } from "../../helpers/getImageUrl";
import { useWindowDimensions } from "src/hooks/useWindowsDimension";

import {
  ProjectCardLeftImage,
  ProjectCardRightImage,
  MobileProjectCard,
} from "../../components/projectCard";

interface PropsType {
  projects: any;
  pageData: any;
}

export async function getServerSideProps() {
  const _projects = await client.getEntries({ content_type: "projects" });
  const _portfolioPageData = await client.getEntries({
    content_type: "portfolioPage",
  });

  return {
    props: {
      pageData: _portfolioPageData.items[0],
      projects: _projects.items,
    },
  };
}

const Portfolio: NextPage<PropsType> = ({ pageData, projects }) => {
  const { bannerTitle, bannerText, bannerImage, pageTitle } = pageData.fields;
  const bannerUrl = getImageURL(bannerImage);
  const { width } = useWindowDimensions();

  return (
    <>
      <TopContainer
        flexDirection="column"
        marginTop="-97px"
        bgImage={bannerUrl}
      >
        <div className="flex flex-col pt-[97px] justify-center content-center items-center lg:w-[80%] lg:flex-row">
          <div className="flex flex-col animate-slideUp justify-center items-center text-white lg:px-8 lg:w-[70%] space-y-8">
            <h1 className=" text-white text-mobileTitle md:text-title font-extrabold text-center">
              {bannerTitle}
            </h1>
            <div className="">
              <span className="text-bannerText text-center">
                {renderDocument(bannerText)}
              </span>
            </div>
          </div>
        </div>
      </TopContainer>
      <div className="flex flex-col justify-start bg-hs-bg min-h-[1000px] items-center w-full py-12 px-5 md:px-[5%] lg:px-[10%]">
        <h1 className="animate-slideRight  text-mobileTitle md:text-title">
          {pageTitle}
        </h1>
        <div className="grid grid-cols-1 gap-10 mt-10 lg:w-2/3">
          {width !== null && width < 640
            ? projects.map((project: any, index: number) => {
                const { name, slug, image, excerpt } = project.fields;
                const imageUrl = image && getImageURL(image);
                return (
                  <MobileProjectCard
                    imageUrl={imageUrl}
                    name={name}
                    excerpt={excerpt}
                    slug={slug}
                    key={name}
                  />
                );
              })
            : projects.map((project: any, index: number) => {
                const { name, slug, image, excerpt } = project.fields;
                const imageUrl = image && getImageURL(image);
                return index % 2 == 0 ? (
                  <ProjectCardLeftImage
                    imageUrl={imageUrl}
                    name={name}
                    excerpt={excerpt}
                    slug={slug}
                    key={name}
                  />
                ) : (
                  <ProjectCardRightImage
                    imageUrl={imageUrl}
                    name={name}
                    excerpt={excerpt}
                    slug={slug}
                    key={name}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Portfolio;
