import * as React from "react";
import { Button, Card, CustomFlowbiteTheme, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar, HiCheck, HiOutlineDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";

interface Step {
  no: number;
  coverPhoto: string;
  title: string;
  infoLink: string;
  applicationLink?: string;
  descriptions: string[];
}

type Steps = Step[];

interface FormInputs {
  [step: string]: number;
  maxStep: number;
}

const VisaJourneyComp: React.FC<{}> = () => {
  // Journey Form CheckList
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

  return (
    <>
      <form>
        <input type="hidden" {...register("maxStep")}></input>
        <Timeline>
          {steps &&
            steps.map((step, stepIndex) => {
              const coverImage = require(`@src/assets/image/${step.coverPhoto}`).default;
              const stepCheckBoxName = "step_" + step.no;

              return (
                <>
                  {/* Step Check box */}
                  <input
                    type="checkbox"
                    className="hidden"
                    {...register(stepCheckBoxName)}
                    checked={getValues(stepCheckBoxName) >= 1}
                    value={1}
                  ></input>

                  <Timeline.Item key={"step_" + stepIndex}>
                    <div data-testid="timeline-point" className="bg-black-100">
                      <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 ring-8 ring-white dark:bg-cyan-900 dark:ring-gray-900">
                        {getValues(stepCheckBoxName) >= 1 ? (
                          <HiCheck className="h-3 w-3 text-black-600 dark:text-black-300" />
                        ) : (
                          <HiOutlineDotsHorizontal className="h-3 w-3 text-black-600 dark:text-black-300" />
                        )}
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
                          <div>
                            <button
                              type="button"
                              className={
                                (getValues(stepCheckBoxName) >= 1
                                  ? "bg-gray-900 text-white "
                                  : "bg-white text-gray-900 ") +
                                " hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded text-xs px-2.5 py-0.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 float-right"
                              }
                              onClick={() => {
                                setValue(
                                  stepCheckBoxName,
                                  getValues(stepCheckBoxName) >= 1 ? 0 : 1
                                );
                              }}
                            >
                              {getValues(stepCheckBoxName) >= 1 ? "Complete" : "Incomplete"}
                            </button>
                          </div>
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
                </>
              );
            })}
        </Timeline>
      </form>
    </>
  );
};

export default VisaJourneyComp;
