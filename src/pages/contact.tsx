import { NextPage } from "next";
import React from "react";
import ContactComponent from "../components/contact";
import { client } from "../lib/contentful";
import TopContainer from "../components/pageTopContainer";
import { renderDocument } from "../components/document/renderDocument";
import { getImageURL } from "../helpers/getImageUrl";

type PropsType = {
  pageData: any;
};

export async function getServerSideProps() {
  const _contactPageData = await client.getEntries({
    content_type: "contactPage",
  });

  return {
    props: {
      pageData: _contactPageData.items[0],
    },
  };
}

const Contact: NextPage<PropsType> = ({ pageData }) => {
  const { title, description, image } = pageData.fields;

  const imgURL = getImageURL(image);
  return (
    <>
      <TopContainer flexDirection="column" bgImage={imgURL} marginTop="-97px">
        <div className="flex flex-col h-[250px] justify-center content-center items-center lg:flex-row">
          <div className="flex flex-col animate-slideUp self-center text-white text-center  lg:w-[50%] space-y-4">
            <h1 className=" text-white text-mobileTitle font-extrabold sm:text-pageTitle">
              {title}
            </h1>
            <span className="text-white text-bannerText">
              {renderDocument(description)}
            </span>
          </div>
        </div>
      </TopContainer>
      <ContactComponent />
    </>
  );
};

export default Contact;
