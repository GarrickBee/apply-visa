import { useEffect, useState } from "react";
import { Box, Container, Step, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavBarComponent from "@src/component/layout/navbar";
import VisaJourneyComp from "@src/component/visa-journey.comp";
import planet from "@src/assets/image/planet.svg";

import {
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import Config from "@src/config/config";

interface FormInputs {
  [step: string]: number;
  maxStep: number;
}

interface Step {
  no: number;
  coverPhoto: string;
  title: string;
  infoLink: string;
  applicationLink?: string;
  descriptions: string[];
}

type Steps = Step[];

const NewHomePage: React.FC<{}> = () => {
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));

  // Init Detail Explanation Modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);

  const { register, watch, setValue, getValues, reset } = useForm<FormInputs>();
  // Load save form data
  useFormPersist("visa.us.travel", {
    watch,
    setValue,
    storage: window.localStorage,
  });

  // Load visa step
  const [steps, setSteps] = useState<Steps | undefined>(undefined);
  useEffect(() => {
    const loadSteps = async () => {
      const response = await import("@src/assets/json/journey/visa.us.en.json");
      setSteps(response.default.steps.sort((a, b) => a.no - b.no));
    };

    loadSteps();
  }, []);

  const shareUrl = window.location.href;
  return (
    <>
      <div className="container">
        <NavBarComponent></NavBarComponent>
        <div className="grid lg:grid-cols-12 lg:grid-flow-row-dense place-items-center pt-16 pb-8 md:pt-5 md:pb-10">
          <img src={planet} alt="" className="col-span-5 py-6 md:order-1 hidden md:block" />
          <div className="col-span-7">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight xl:tracking-tighter">
              Journey to Your Tourist Visa
            </h1>
            <p className="text-lg mt-4 text-slate-600 max-w-xl">
              Tired of the complex U.S. tourist visa application process? Simplify it with us. Our
              platform expertly guides you through each step - from application to getting your
              visa.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={Config.getJourneyLink()}
                target="_blank"
                rel="noopener"
                className="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-5 py-2.5 bg-black text-white hover:bg-gray-800 border-2 border-transparent flex gap-1 items-center justify-center"
              >
                Share Your Journey
              </a>

              <button
                data-popover-target="popover-animation"
                type="button"
                className="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-5 py-2.5 bg-white border-2 border-black hover:bg-gray-100 text-black flex gap-1 items-center justify-center"
              >
                Share To Your Friends
              </button>

              <div
                data-popover
                id="popover-animation"
                role="tooltip"
                className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
              >
                <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-center">
                    Share To Your Friends
                  </h3>
                </div>
                <div className="px-3 py-2 text-center">
                  <FacebookShareButton url={shareUrl} className="mr-1">
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} className="mr-1">
                    <XIcon size={32} round />
                  </TwitterShareButton>
                  <WhatsappShareButton url={shareUrl} className="mr-1">
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <TelegramShareButton url={shareUrl} className="mr-1">
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>
                  <RedditShareButton url={shareUrl} className="mr-1">
                    <RedditIcon size={32} round />
                  </RedditShareButton>
                </div>
                <div data-popper-arrow></div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Journey Section  */}
        <section>
          <div className="grid grid-flow-row-dense grid-cols-12 justify-items-center">
            <div className="col-span-12 mb-10 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">US Travel Visa</h2>
            </div>

            <div className="md:col-start-3 md:col-span-8 col-span-12">
              <VisaJourneyComp></VisaJourneyComp>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-black p-8 md:px-20 md:py-20 mt-20 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
            <h2 className="text-white text-4xl md:text-6xl tracking-tight">
              Your desire country is not listed here?
            </h2>
            <p className="text-slate-400 mt-4 text-lg md:text-xl">
              Ask your friends to share their journey to us by clicking the link below or drop us an
              email at{" "}
              <a
                href="mailto:applyvisa.gk@gmail.com"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                here
              </a>
            </p>
            <div className="flex mt-5">
              <a
                href={Config.getJourneyLink()}
                className="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-5 py-2.5 bg-white text-black border-2 border-transparent"
              >
                Share Your Journey
              </a>
            </div>
          </div>
        </section>
        <footer>
          <Container>
            <Grid container minHeight={"20vh"} display={"flex"} alignItems={"center"}>
              <Grid xs={12} textAlign={"center"}>
                <Typography>
                  Built By <b>Garrick</b>
                </Typography>
              </Grid>
            </Grid>
            <Box></Box>
          </Container>
        </footer>
      </div>
    </>
  );
};

export default NewHomePage;
