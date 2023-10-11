import { ReactNode, useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import usDepartmentOfStatePng from "../assets/image/us_department_of_state.png";
import usTravelDocsPng from "../assets/image/us_flag_jeep.avif";
import onlinePaymentPhoto from "../assets/image/payment.jpg";
import interviewPhoto from "../assets/image/visa-interview.jpg";
import readyToTravelPhoto from "../assets/image/ready_to_travel.jpg";
import scheduleInterviewPhoto from "../assets/image/schedule_interview.jpg";
import Grid from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";

interface FormInputs {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
  step5: boolean;
  step6: boolean;
}

const HomePage: React.FC<{}> = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);

  const { register, watch, setValue, getValues } = useForm<FormInputs>();

  useFormPersist("visa.us.travel", {
    watch,
    setValue,
    storage: window.localStorage,
  });

  const TimelineCard: React.FC<{
    cardAlign?: "right" | "left";
    coverPhoto: string;
    title: string;
    description: () => ReactNode;
    infoLink: string;
    applicationLink?: string;
  }> = ({ cardAlign, title, coverPhoto, description, infoLink, applicationLink }) => {
    return (
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Card sx={{ width: 375, ...(cardAlign ? { float: cardAlign } : {}) }}>
          <CardActionArea>
            <CardMedia sx={{ height: 200, objectFit: "cover" }} image={coverPhoto} title={title} />
            <CardContent sx={{ textAlign: "left" }}>
              <Typography gutterBottom variant="h5" component="div" lineHeight={1.1}>
                {title}
              </Typography>
              {description()}
            </CardContent>
          </CardActionArea>
          <CardActions>
            {applicationLink && (
              <Button href={applicationLink} target="_blank" rel="noopener" size="small">
                Go To Application
              </Button>
            )}
            <Button size="small">Learn More</Button>
            <Button size="small">Share</Button>
            <Button onClick={() => setModalOpen(true)}>Open modal</Button>
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

      <Timeline position="alternate">
        <form>
          {/* Step 1  */}
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              Step 1
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <Checkbox
                color="success"
                {...register("step1")}
                checked={getValues("step1") == true}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineCard
              coverPhoto={usDepartmentOfStatePng}
              title="Online Nonimmigrant Visa Application (DS-160)"
              infoLink="https://ceac.state.gov/genniv"
              applicationLink="https://ceac.state.gov/genniv"
              description={() => (
                <>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Access the DS-160 online application form.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fill out the form accurately, providing all required information. Be prepared to
                    upload a recent passport-sized photo.
                  </Typography>
                </>
              )}
            ></TimelineCard>
          </TimelineItem>
          {/* Steps 2  */}
          <TimelineItem>
            <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
              Step 2
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <Checkbox
                color="success"
                {...register("step2")}
                checked={getValues("step2") == true}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineCard
              coverPhoto={usTravelDocsPng}
              title="Create a Profile on the U.S. Visa Information and Appointment Services Website"
              infoLink="https://portal.ustraveldocs.com/applicanthome"
              applicationLink="https://portal.ustraveldocs.com/applicanthome"
              cardAlign="right"
              description={() => (
                <>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Go to the U.S. Visa Information and Appointment Services website.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Create a profile and enter the DS-160 confirmation number.
                  </Typography>
                </>
              )}
            ></TimelineCard>
          </TimelineItem>

          {/* Steps 3  */}
          <TimelineItem>
            <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
              Step 3
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <Checkbox
                color="success"
                {...register("step3")}
                checked={getValues("step3") == true}
              />
              <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
            </TimelineSeparator>
            <TimelineCard
              coverPhoto={onlinePaymentPhoto}
              title="Pay the Visa Application Fee"
              infoLink="https://ceac.state.gov/genniv"
              description={() => (
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    textAlign={"justify"}
                  >
                    Pay the non-refundable visa application fee through the designated payment
                    system.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Save the payment receipt as you will need it for scheduling your visa interview.
                  </Typography>
                </>
              )}
            ></TimelineCard>
          </TimelineItem>

          {/* Step 4 */}
          <TimelineItem>
            <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
              Step 4
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
              <Checkbox
                color="success"
                {...register("step4")}
                checked={getValues("step4") == true}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineCard
              coverPhoto={scheduleInterviewPhoto}
              title="Schedule An Interview"
              infoLink="https://ceac.state.gov/genniv"
              cardAlign="right"
              description={() => (
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign={"justify"}
                    gutterBottom
                  >
                    Use your profile on the U.S. Visa Information and Appointment Services website
                    to schedule a visa interview at the nearest U.S. Embassy or Consulate.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign={"justify"}>
                    Pay any additional processing fees if required.
                  </Typography>
                </>
              )}
            ></TimelineCard>
          </TimelineItem>

          {/* Step 5 */}
          <TimelineItem>
            <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
              Step 5
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
              <Checkbox
                color="success"
                {...register("step5")}
                checked={getValues("step5") == true}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineCard
              coverPhoto={interviewPhoto}
              title="Attend the Visa Interview"
              infoLink="https://ceac.state.gov/genniv"
              description={() => (
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    textAlign={"justify"}
                  >
                    Prepare all necessary documents, including your DS-160 confirmation page,
                    passport, photo, and supporting documents based on your visa type.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Attend the visa interview at the scheduled time and location.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Answer questions honestly and provide any requested information.
                  </Typography>
                </>
              )}
            ></TimelineCard>
          </TimelineItem>

          {/* Step 6 */}
          <TimelineItem>
            <TimelineOppositeContent sx={{ m: "auto 0" }} variant="body2" color="text.secondary">
              Step 6
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
              <Checkbox
                color="success"
                {...register("step6")}
                checked={getValues("step6") == true}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineCard
              coverPhoto={readyToTravelPhoto}
              title="Collect Your Visa And Get Ready To Travel"
              infoLink="https://ceac.state.gov/genniv"
              cardAlign="right"
              description={() => (
                <>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    After the interview and fingerprinting (if applicable), your visa application
                    will undergo processing.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    This can take several weeks, so be patient.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Once you have your visa, you can plan your trip to the United States.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enjoy your trip to the U.S.!
                  </Typography>
                </>
              )}
            ></TimelineCard>
          </TimelineItem>
        </form>
      </Timeline>
    </>
  );
};

export default HomePage;
