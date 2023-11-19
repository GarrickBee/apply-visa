import * as React from "react";
import { Button, Card, CustomFlowbiteTheme, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar, HiCheck, HiOutlineDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";

interface Step {
  no: number;
  coverPhoto: string;
  title: string;
  infoLink: string;
  applicationLink?: string;
  descriptions: string[];
}

type Steps = Step[];

const TimelineComp: React.FC<{}> = () => {
  // Load visa step
  const [steps, setSteps] = useState<Steps | undefined>(undefined);
  useEffect(() => {
    const loadSteps = async () => {
      const response = await import("@src/assets/json/journey/visa.us.en.json");
      setSteps(response.default.steps.sort((a, b) => a.no - b.no));
    };

    loadSteps();
  }, []);

  return (
    <>
      <Timeline>
        {steps &&
          steps.map((step, stepIndex) => {
            const coverImage = require(`@src/assets/image/${step.coverPhoto}`).default;
            const formName = "step_" + step.no;

            return (
              <Timeline.Item key={"step_" + stepIndex}>
                <div data-testid="timeline-point" className="bg-black-100">
                  <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 ring-8 ring-white dark:bg-cyan-900 dark:ring-gray-900">
                    <HiOutlineDotsHorizontal className="h-3 w-3 text-black-600 dark:text-black-300" />
                  </span>
                </div>

                <Timeline.Content>
                  <Timeline.Title className="mb-3">Step {stepIndex + 1}</Timeline.Title>
                  {/* Card  */}
                  <div className="grid grid-flow-row-dense grid-cols-12 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col w-100 max-w-fit md:flex-row">
                    <img
                      className="col-span-4 object-cover w-full rounded-t-lg h-full md:rounded-none md:rounded-s-lg"
                      src={coverImage}
                      alt=""
                    />
                    <div className="col-span-8 flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {step.title}
                      </h5>

                      {step &&
                        step.descriptions &&
                        step.descriptions.map((desc, descIndex) => {
                          return (
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                              {desc}
                            </p>
                          );
                        })}

                      <div>
                        {step.applicationLink && (
                          <Button
                            href={step.applicationLink}
                            target="_blank"
                            color="gray"
                            className="inline-block"
                          >
                            Application
                            <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Timeline.Content>
              </Timeline.Item>
            );
          })}
      </Timeline>
    </>
  );
};

export default TimelineComp;
