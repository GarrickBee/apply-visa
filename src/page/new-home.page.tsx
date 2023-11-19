import { useEffect, useState } from "react";
import { Box, Container, Step, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavBarComponent from "@src/component/layout/navbar";
import TimelineComp from "@src/component/timeline.comp";
import planet from "@src/assets/image/planet.svg";
import { ReactSVG } from "react-svg";

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
      const response = await import("./visa.us.en.json");
      setSteps(response.default.steps.sort((a, b) => a.no - b.no));
    };

    loadSteps();
  }, []);

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-5">
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
                href="https://forms.gle/gi413N6qzPS2weHe6"
                target="_blank"
                rel="noopener"
                className="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-5 py-2.5 bg-black text-white hover:bg-gray-800 border-2 border-transparent flex gap-1 items-center justify-center"
              >
                Share Your Journey
              </a>
              <a
                href="https://github.com/GarrickBee/apply-visa"
                rel="noopener"
                target="_blank"
                className="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-5 py-2.5 bg-white border-2 border-black hover:bg-gray-100 text-black flex gap-1 items-center justify-center"
              >
                Share To Your Friends
              </a>
            </div>
          </div>
        </div>

        {/* Form Journey Section  */}
        <section>
          <div className="grid grid-flow-row-dense grid-cols-12 justify-items-center">
            <div className="md:col-start-3 md:col-span-8 col-span-12">
              <TimelineComp></TimelineComp>
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
