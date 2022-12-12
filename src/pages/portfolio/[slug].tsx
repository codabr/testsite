import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "../../components/container";
import TopContainer from "../../components/pageTopContainer";
import { client } from "../../lib/contentful";
import Image from "next/image";
import { getImageURL } from "../../helpers/getImageUrl";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const getServerSideProps = async ({ params }: any) => {
  const { items } = await client.getEntries({
    content_type: "projects",
    "fields.slug": params.slug,
  });

  if (!items.length) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: { project: items[0] },
  };
};

const ProjectDetails: NextPage = ({ project }: any) => {
  const { name, bannerImage, description, demoTitle, demo } = project?.fields;

  const bannerUrl = getImageURL(bannerImage);
  const options = {
    renderText: (text: string) =>
      text.split("\n").flatMap((text, i) => [i > 0 && <br />, text]),
  };

  return (
    <>
      <TopContainer
        flexDirection="column"
        marginTop="-97px"
        bgImage={bannerUrl}
      >
        <div className="flex flex-col pt-[97px] justify-center content-center items-center lg:w-[80%] lg:flex-row">
          <div className="flex flex-col justify-center items-center text-white lg:px-8 lg:w-[70%] space-y-8">
            <h1 className=" text-white text-mobileTitle md:text-title font-extrabold text-center animate-slideUp">
              {name}
            </h1>
          </div>
        </div>
      </TopContainer>
      <Container flexDirection="column">
        <div className="grid grid-cols-1 gap-9 lg:w-2/3 animate-slideRight">
          <span className="text-justify">
            {documentToReactComponents(description, options)}
          </span>
          <div className="flex flex-col items-center space-y-11">
            <h1 className="mb-10 text-mobileTitle md:text-title">
              {demoTitle}
            </h1>
            {demo.map((video: any, index: number) => {
              return (
                <div className="mt-8 flex flex-col items-center" key={index}>
                  <h1 className="text-mobileTitle md:text-title mb-12">
                    {" "}
                    {video.fields.title}
                  </h1>
                  <Image
                    src={getImageURL(video)}
                    alt=""
                    width={video.fields.file.details.image.width}
                    height={video.fields.file.details.image.height}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProjectDetails;
