import React, { useState, useEffect } from "react";
import { FaRegBookmark } from "react-icons/fa";
import { MdDelete, MdEdit, MdOutlineLocationOn } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Description from "../ui/Description";
import { useRouter } from "next/router";
import { VscUnverified } from "react-icons/vsc";
import { Rating, StickerStar } from "@smastrom/react-rating";
import { AnimatePresence } from "framer-motion";
import DeleteConfirmationModal from "../ui/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteJob, editJob, getJobs } from "@/axios/axios";
import Modal from "../ui/Modal";
import { setEditLoading, setLoading } from "@/redux/reducers/jobSlice";
import { RxCross1 } from "react-icons/rx";
import { RootState } from "@/redux/store";

interface ProjectCardProps {
  data: any;
  index: any;
  length: number;
  myJob: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  data,
  index,
  length,
  myJob,
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/job/${data?._id}`);
  };
  const dispatch = useDispatch();
  const posted: string = "recently";
  const proposals: string = "0";
  const [showDeleteExperienceModal, setShowDeleteExperienceModal] =
    React.useState<string | null>(null);
  const editJobLoading: boolean = useSelector(
    (state: RootState) => state.jobs?.editLoading
  );
  const handleDeleteExperience = () => {
    dispatch(
      deleteJob({
        jobId: showDeleteExperienceModal,
      })
    )
      .then(() => {
        // After adding experience, fetch the updated profile data
        return dispatch(getJobs());
      })
      .then(() => {
        // Once profile is fetched, reset loading state and close modal
        setShowDeleteExperienceModal(null);
      })
      .catch((error: any) => {
        console.error("Error:", error);
      });
  };

  const [showEditJobModal, setShowEditJobModal] = useState(null);
  const [formData, setFormData] = useState<any>({
    title: data?.title,
    budget: data?.budget,
    deadline: data?.deadline,
    project_size: data?.project_size,
    job_description: data?.job_description,
    skills: data?.skills,
    user: data?.profile?.user,
  });
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  // Function to check form validity
  const checkFormValidity = () => {
    const { budget, deadline, title, job_description, project_size, skills } =
      formData;
    setIsSaveEnabled(
      title !== data?.title ||
        budget !== data?.budget ||
        deadline !== data?.deadline ||
        project_size !== data?.project_size ||
        job_description !== data?.job_description ||
        skills !== data?.skills
    );
  };

  useEffect(() => {
    // Call checkFormValidity whenever formData changes
    checkFormValidity();
  }, [formData]);
  // Function to handle saving experience data
  const handleSaveJob = () => {
    if (isSaveEnabled) {
      dispatch(setEditLoading(true));
      dispatch(
        editJob({
          jobData: formData,
          jobId: data?._id,
        })
      )
        .then(() => {
          // After adding experience, fetch the updated profile data
          return dispatch(getJobs(""));
        })
        .then(() => {
          // Once profile is fetched, reset loading state and close modal
          dispatch(setEditLoading(false));
          setShowEditJobModal(null);
        })
        .catch((error: any) => {
          console.error("Error:", error);
          dispatch(setEditLoading(false));
        });
    } else {
      console.error("Incomplete form fields");
    }
  };

  useEffect(() => {
    // Reset form data when the modal is closed
    if (!showEditJobModal) {
      setFormData({
        title: data?.title,
        budget: data?.budget,
        deadline: data?.deadline,
        project_size: data?.project_size,
        job_description: data?.job_description,
        skills: data?.skills,
        user: data?.profile?.user,
      });
    }
  }, [showEditJobModal]);
  return (
    <div
      className={`w-full project-card pb-6 border-b cursor-pointer hover:bg-gray-100 group transition-all p-3 shadow-none ${
        length - 1 === index && "border-none "
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-center">
        <p className="text-sm text-secondary">Posted {posted}</p>
        {myJob ? (
          <div className="flex items-center gap-x-2">
            <div
              className="rounded-full p-[6px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event from bubbling up
                setShowEditJobModal(data?._id);
              }}
            >
              <MdEdit className="text-primary text-lg" />

              <AnimatePresence initial={false} onExitComplete={() => null}>
                {showEditJobModal && (
                  <Modal>
                    <div className="p-8 rounded-2xl bg-white min-w-[768px] max-w-lg relative">
                      <div className="flex flex-col max-h-[80vh] p-1 overflow-y-auto">
                        <div className="flex items-center justify-between">
                          <p className="text-3xl font-semibold">Edit job</p>
                          <RxCross1
                            className="text-2xl cursor-pointer"
                            onClick={() => setShowEditJobModal(null)}
                          />
                        </div>
                        <div className="flex flex-col space-y-4 my-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <label
                              htmlFor="title"
                              className="col-span-full font-medium"
                            >
                              Job Title
                            </label>
                            <input
                              type="text"
                              id="title"
                              name="title"
                              value={formData.title}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  title: e.target.value,
                                  user: data?.profile?.user,
                                })
                              }
                              className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="Ex: Upwork"
                              required
                            />
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            {/* Input fields for budget and deadline */}
                            <div className="w-1/2">
                              <label htmlFor="budget" className=" font-medium">
                                Budget (USD)
                              </label>
                              <input
                                type="number"
                                id="budget"
                                name="budget"
                                value={formData.budget}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    budget: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Enter budget"
                                required
                              />
                            </div>
                            <div className="w-1/2">
                              <label
                                htmlFor="deadline"
                                className=" font-medium"
                              >
                                Project Time (Days)
                              </label>
                              <input
                                type="number"
                                id="deadline"
                                name="deadline"
                                value={formData.deadline}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    deadline: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Ex: United States"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            {/* Input field for job title */}
                            <label
                              htmlFor="project_size"
                              className="col-span-full font-medium"
                            >
                              Project Size
                            </label>
                            <select
                              id="efficiency"
                              name="efficiency"
                              value={formData.project_size}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  project_size: e.target.value,
                                })
                              }
                              className="cursor-pointer px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full my-2"
                              required
                            >
                              <option value="">Select Project Size</option>
                              <option value="Small">Small</option>
                              <option value="Medium">Medium</option>
                              <option value="Large">Large</option>
                            </select>
                          </div>

                          <div>
                            {/* Input field for job_description */}
                            <h3 className="font-medium">Job Description</h3>
                            <div className="mt-2">
                              <textarea
                                id="job_description"
                                rows={3}
                                value={formData.job_description}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    job_description: e.target.value,
                                  })
                                }
                                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                                placeholder="Enter Job Description"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between space-x-2 pt-3 border-t">
                        <button
                          type="button"
                          className="px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none w-full"
                          onClick={() => setShowEditJobModal(null)}
                        >
                          Cancel
                        </button>
                        {editJobLoading ? (
                          <button
                            type="button"
                            className={`px-4 py-4 font-medium text-white bg-primary bg-opabudget-80 border border-transparent rounded-md shadow-sm hover:bg-opabudget-90 transition-all focus:outline-none w-full cursor-context-menu  `}
                          >
                            <div className="loaderProfile mx-auto"></div>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className={`px-4 py-3 font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-opabudget-90 transition-all focus:outline-none w-full ${
                              isSaveEnabled
                                ? ""
                                : "opabudget-50 cursor-not-allowed"
                            }`}
                            onClick={handleSaveJob}
                            disabled={!isSaveEnabled}
                          >
                            Post
                          </button>
                        )}
                      </div>
                    </div>
                  </Modal>
                )}
              </AnimatePresence>
            </div>
            <div
              className="rounded-full p-[6px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event from bubbling up
                setShowDeleteExperienceModal(data?._id);
              }}
            >
              <MdDelete className="text-primary text-lg" />

              <AnimatePresence initial={false} onExitComplete={() => null}>
                {showDeleteExperienceModal && (
                  <DeleteConfirmationModal
                    title="Job"
                    onClose={() => setShowDeleteExperienceModal(null)}
                    onConfirm={() => handleDeleteExperience()}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          // <FaRegBookmark className="text-primary text-lg cursor-pointer transition-all hover:opacity-90" />
          ""
        )}
      </div>
      <h2 className="text-xl font-semibold group-hover:text-primary">
        {data?.title}
      </h2>
      <div className="flex items-center  ">
        <p className=" pt-3 text-secondary ">
          Est. budget : <span className="font-medium">${data?.budget}</span> |
        </p>

        <p className=" pt-3 text-secondary ml-1">
          Est. duration :{" "}
          <span className="font-medium">{data?.deadline} days</span> |
        </p>
        <p className=" pt-3 text-secondary ml-1">
          Project size :{" "}
          <span className="font-medium">{data?.project_size} </span>
        </p>
      </div>
      <Description
        description={data?.job_description}
        className="py-3 text-green-900"
      />
      <div className="flex justify-start gap-x-6 items-center">
        {data?.profile?.payment_verified ? (
          <div className="flex items-center gap-x-1 text-secondary">
            <RiVerifiedBadgeFill /> Payment Verified{" "}
          </div>
        ) : (
          <div className="flex items-center gap-x-1 text-secondary">
            <VscUnverified /> Payment Unverified{" "}
          </div>
        )}

        <div className=" text-secondary flex items-center gap-x-2 font-medium">
          <Rating
            style={{ maxWidth: 100 }}
            value={data?.profile?.overall_rating}
            readOnly
            itemStyles={{
              itemShapes: StickerStar,
              activeFillColor: "#35B900",
              inactiveFillColor: "#cecece",
            }}
          />

          <p className="font-medium  text-secondary">
            {" "}
            {data?.profile?.overall_rating?.toFixed(2)}
          </p>
          <p>({data?.profile?.completed_projects} reviews)</p>
        </div>
        <p className="text-md  text-secondary">
          <span className="font-medium">${data?.profile?.amount_earned}</span>{" "}
          spent
        </p>
        <p className="flex items-center">
          <MdOutlineLocationOn className="text-md mr-1 font-medium text-secondary" />
          <span className="text-md text-secondary ">
            {data?.profile?.location}
          </span>
        </p>
      </div>

      <div className="flex flex-wrap gap-x-2  gap-y-2 my-3">
        {data?.skills?.map((element: any, idx: any) => (
          <div key={`skillset-${idx}`}>
            <button className="rounded-3xl px-3 py-1  bg-gray-400 bg-opacity-[0.18] text-secondary text-center active:scale-95 ">
              {element?.name}
            </button>
          </div>
        ))}
      </div>
      <p className="text-md  text-secondary">
        Proposals : <span className="font-medium">{proposals}</span>
      </p>
    </div>
  );
};

export default ProjectCard;
