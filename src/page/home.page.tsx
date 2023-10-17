import { ReactNode, useEffect, useState } from "react";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import useMediaQuery from "@mui/material/useMediaQuery";

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

const HomePage: React.FC<{}> = () => {
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

  useEffect(() => {
    watch((value, { name, type }) => console.log(value, name, type));
  }, [watch]);

  const TimelineCard: React.FC<{
    cardAlign?: "right" | "left";
    coverPhoto: string;
    title: string;
    infoLink: string;
    applicationLink?: string;
    children: ReactNode;
  }> = ({ cardAlign, title, coverPhoto, infoLink, applicationLink, children }) => {
    return (
      <TimelineContent>
        <Card sx={{ maxWidth: 415, width: "100%", ...(cardAlign ? { float: cardAlign } : {}) }}>
          <CardActionArea>
            <CardMedia sx={{ height: 200, objectFit: "cover" }} image={coverPhoto} title={title} />
            <CardContent sx={{ textAlign: "left" }}>
              <Typography gutterBottom variant="h5" component="div" lineHeight={1.1}>
                {title}
              </Typography>
              {children}
            </CardContent>
          </CardActionArea>
          <CardActions>
            {applicationLink && (
              <Button href={applicationLink} target="_blank" rel="noopener" size="small">
                Go To Application
              </Button>
            )}
            {/* <Button onClick={() => setModalOpen(true)}>Open modal</Button> */}
          </CardActions>
        </Card>
      </TimelineContent>
    );
  };

  return (
    <>
      {/* Timeline Card Details  */}
      <Dialog fullWidth={true} maxWidth={"xl"} open={modalOpen} onClose={handleClose}>
        <DialogTitle>Title</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid md={6}>
              <DialogContentText>Picture</DialogContentText>
            </Grid>
            <Grid md={6}>Description</Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <form>
        <Container maxWidth="xl">
          <Timeline position={isMobile ? "left" : "alternate"} style={{ padding: "0" }}>
            <input type="hidden" {...register("maxStep")}></input>
            {steps &&
              steps.map((step, stepIndex) => {
                const coverImage = require(`@src/assets/image/${step.coverPhoto}`).default;
                const formName = "step_" + step.no;

                return (
                  <TimelineItem key={"step_" + stepIndex}>
                    <TimelineOppositeContent
                      sx={{
                        ...{ marginBottom: "auto", marginTop: "auto" },
                        ...(isMobile ? { flex: 0, padding: 0 } : {}),
                      }}
                      align="right"
                      variant="body2"
                      color="text.secondary"
                    >
                      {isMobile ? "" : "Step"} {stepIndex + 1}
                    </TimelineOppositeContent>

                    <TimelineSeparator>
                      <TimelineConnector />
                      <Checkbox
                        color="primary"
                        {...register(formName)}
                        checked={getValues(formName) >= 1}
                        value={1}
                      />
                      <TimelineConnector />
                    </TimelineSeparator>

                    <TimelineCard
                      coverPhoto={coverImage}
                      title={step.title}
                      infoLink={step.infoLink}
                      applicationLink={step.applicationLink}
                      cardAlign={isMobile ? "right" : stepIndex % 2 == 0 ? "left" : "right"}
                    >
                      <List sx={{ listStyle: "decimal", pl: 2 }} color="secondary">
                        {step &&
                          step.descriptions &&
                          step.descriptions.map((desc, descIndex) => {
                            return (
                              <ListItem
                                sx={{ display: "list-item" }}
                                disableGutters
                                color="text.secondary"
                              >
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  key={"desc_" + descIndex}
                                  gutterBottom={descIndex != step.descriptions.length - 1}
                                >
                                  {desc}
                                </Typography>
                              </ListItem>
                            );
                          })}
                      </List>
                    </TimelineCard>
                  </TimelineItem>
                );
              })}
          </Timeline>

          <Grid container spacing={2} justifyContent={"center"} textAlign={"center"}>
            <Grid xs={12} md={1}>
              <Button variant="contained">Share</Button>
            </Grid>
            <Grid xs={12} md={1}>
              <Button variant="contained" onClick={() => reset()}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </Container>
      </form>
    </>
  );
};

export default HomePage;
