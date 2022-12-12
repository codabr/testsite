import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useState,
  useEffect,
  useRef,
} from "react";
import { ThreeDots } from "react-loader-spinner";

import { motion, useAnimation, useInView } from "framer-motion";
import { Container } from "../container";
import Button from "../button";

const ContactComponent: FC = () => {
  const [error, setError] = useState({});
  const [status, setStatus] = useState({
    state: "",
    message: "",
  });

  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const animation = useAnimation();

  useEffect(() => {
    if (isInView) {
      animation.start({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
        },
      });
    }
    !isInView &&
      animation.start({
        y: 0,
        opacity: 0,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  const sendMail = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "Sending..." });
  };

  return (
    <Container flexDirection="column">
      <motion.div
        ref={ref}
        animate={animation}
        className="-mt-[200px] w-full bg-white rounded lg:w-2/3 py-8 shadow-lg lg:mx-auto flex items-center justify-center"
      >
        <div className="w-full px-6 ">
          <form
            className="space-y-4 w-full sm:w-2/3 mx-auto py-10 text-md"
            onSubmit={sendMail}
          >
            <div className="w-full">
              <input
                className=" border rounded w-full px-3 py-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-hs-blue"
                value={values.name}
                onChange={handleInputChange}
                name="name"
                placeholder="Your name *"
                required
              />
            </div>
            <div>
              <input
                className=" border rounded w-full px-3 py-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-hs-blue"
                value={values.email}
                onChange={handleInputChange}
                name="email"
                type="email"
                placeholder="Your email *"
                required
              />
            </div>
            <div>
              <textarea
                className="w-full px-3 py-3 h-52 text-gray-700 border rounded focus:outline-none focus:ring-1 focus:ring-hs-blue overflow-auto resize-none"
                value={values.message}
                name="message"
                onChange={handleInputChange}
                placeholder="Your message *"
                required
              />
            </div>
            <div className="flex justify-center">
              {status.state === "error" ? (
                <p className="text-red-500">{status.message}</p>
              ) : (
                status.state === "success" && (
                  <p className="text-green-500">{status.message}</p>
                )
              )}
            </div>
            <div className="flex items-center justify-center">
              <Button bgColor="#003B5C">
                {status.state === "loading" ? (
                  <ThreeDots
                    height="60"
                    width="60"
                    radius="5"
                    color="#FFFFFF"
                    visible={true}
                  />
                ) : (
                  "Send"
                )}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
      {/* </div> */}
    </Container>
  );
};

export default ContactComponent;
