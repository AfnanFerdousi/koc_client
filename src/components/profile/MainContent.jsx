import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, deleteProject } from "../../axios/axios";
import { setLoading } from "@/redux/reducers/loadingSlice";
import Description from "@/components/ui/Description";
import { AnimatePresence } from "framer-motion";
import ProjectModal from "../modals/ProjectModal";
import DeleteModal from "../modals/DeleteModal";
import InfoModal from "../modals/InfoModal";
import { MdDelete, MdEdit } from "react-icons/md";
import { Rating, StickerStar } from "@smastrom/react-rating";
import { FiPlus } from "react-icons/fi";

const MainContent = ({ userProfile, isMine }) => {
  const [showEditProjectModal, setShowEditProjectModal] = useState(null);
  const [showEditInfoModal, setShowEditInfoModal] = useState(null);
  const [infoEditData, setInfoEditData] = useState({
    sub_title: "",
    description: "",
  });
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(null);
  const [projectEditData, setProjectEditData] = useState({
    title: "",
    link: "",
    image: "",
  });

  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();

  const handleDeleteProject = () => {
    dispatch(setLoading(true));
    dispatch(
      deleteProject({
        dynamicParams: {
          userId: userProfile?.user?._id,
          projectId: showDeleteProjectModal,
        },
        bodyData: null,
      })
    )
      .then(() => dispatch(getProfile()))
      .then(() => setShowDeleteProjectModal(null))
      .catch((error) => {
        console.error("Error:", error);
        dispatch(setLoading(false));
      });
  };
  // Toggle show more reviews
  const [displayedRemainingReviews, setDisplayedRemainingReviews] = useState(3);

  const loadMoreReviews = () => {
    setDisplayedRemainingReviews((prev) => prev + 3);
  };

  const showLessReviews = () => {
    setDisplayedRemainingReviews(3);
  };

  // Load more projects

  const [displayedRemainingProjects, setDisplayedRemainingProjects] =
    useState(3);

  const loadMoreProjects = () => {
    setDisplayedRemainingProjects((prev) => prev + 3);
  };

  const showLessProjects = () => {
    setDisplayedRemainingProjects(3);
  };
  return (
    <div className="col-span-2">
      {/* Info section */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold mb-6">
            {userProfile?.sub_title
              ? userProfile?.sub_title
              : "No title added."}
          </p>
          <div
            className={`rounded-full p-[6px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all ${
              !isMine && "hidden"
            }`}
            onClick={() => {
              setShowEditInfoModal(userProfile?.user?._id);
              setInfoEditData({
                sub_title: userProfile?.sub_title,
                description: userProfile?.description,
              });
            }}
          >
            <MdEdit className="text-primary text-lg" />
          </div>
        </div>
        <Description
          description={
            userProfile?.description
              ? userProfile?.description
              : "Please add your description"
          }
          maxLines={5}
          className={"text-secondary"}
        />
      </div>

      {/* work history  */}
      <div className="p-6 border-b">
        <p className="text-2xl font-semibold mb-4">
          Work History ({userProfile?.completed_projects})
        </p>
        {userProfile?.reviews?.length > 0 ? (
          [...userProfile.reviews] // Create a shallow copy
            .reverse() // Reverse the copy of the array
            .slice(0, displayedRemainingReviews)
            .map((item, index) => (
              <div
                className={`p-3 cursor-pointer transition-all group hover:bg-gray-100 ${
                  index < displayedRemainingReviews - 1 ||
                  (userProfile?.reviews?.length - 1 !== index && "border-b")
                }`}
                key={index}
              >
                <p className="text-lg text-primary group-hover:underline cursor-pointer font-medium">
                  {item?.offer?.title}
                </p>

                <div className="flex justify-start gap-x-3 items-center my-2">
                  <div className="items-center flex">
                    <Rating
                      style={{ maxWidth: 100 }}
                      value={item?.rating}
                      readOnly
                      itemStyles={{
                        itemShapes: StickerStar,
                        activeFillColor: "#35B900",
                        inactiveFillColor: "#cecece",
                      }}
                    />
                  </div>
                  <p className="font-medium  text-secondary">
                    {" "}
                    {item?.rating.toFixed(2)}
                  </p>

                  <p>|</p>
                  <p className="text-md  text-secondary">
                    <span className="font-medium">{item?.duration}</span>
                  </p>
                </div>
                <p className="text-secondary ">
                  &apos;{item?.description}&apos;
                </p>
                <p className="text-md pt-3 text-secondary">
                  Project budget :{" "}
                  <span className="font-medium">${item?.amount}</span>
                </p>
              </div>
            ))
        ) : (
          <p className="text-secondary my-2">No data found.</p>
        )}

        <div className={`flex items-center justify-center gap-x-2 `}>
          {userProfile?.reviews?.length > displayedRemainingReviews && (
            <div className="flex items-center justify-center my-4">
              <button
                className="rounded-3xl px-3 py-1 border-primary border text-primary text-center active:scale-95"
                onClick={loadMoreReviews}
              >
                Load more
              </button>
            </div>
          )}
          {displayedRemainingReviews > 3 && (
            <div className="flex items-center justify-center my-4">
              <button
                className="rounded-3xl px-3 py-1 border-primary border text-primary text-center active:scale-95"
                onClick={showLessReviews}
              >
                Show less
              </button>
            </div>
          )}
        </div>
      </div>

      {/* portfolio  */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold mb-4">
            Portfolio ({userProfile?.projects?.length})
          </p>
          <div
            className={`rounded-full p-[3px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all ${
              !isMine && "hidden"
            }`}
            onClick={() => setShowAddProjectModal(true)}
          >
            <FiPlus className="text-primary text-lg" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {userProfile?.projects?.length > 0 ? (
            [...userProfile.projects] // Create a shallow copy
              .reverse() // Reverse the copy of the array
              .slice(0, displayedRemainingProjects)
              .map((item, index) => (
                <div
                  className="group cursor-pointer"
                  key={index}
                  onClick={() => item?.link && window.open(item.link, "_blank")} // Open link in new tab
                >
                  <div className="w-full h-[300px] border rounded-xl">
                    {item?.image ? (
                      <img
                        src={item?.image}
                        alt="picture"
                        className="rounded-xl w-full h-full"
                        style={{
                          objectFit: "cover", // cover, contain, none
                        }}
                      />
                    ) : (
                      <p>No image found</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <p className="text-lg text-primary group-hover:underline  font-medium">
                      {item?.title}
                    </p>

                    <div
                      className={`flex items-center gap-x-1  ${
                        !isMine && "hidden"
                      } `}
                    >
                      <div
                        className="rounded-full p-[3px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all  flex items-center justify-center"
                        onClick={(e) => {
                          setShowEditProjectModal(item?._id);
                          e.stopPropagation();
                          setProjectEditData({
                            title: item?.title,
                            link: item?.link,
                            image: item?.image,
                          });
                        }}
                      >
                        <MdEdit className="text-primary text-lg" />
                      </div>
                      <div
                        className="rounded-full p-[3px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all  flex items-center justify-center"
                        onClick={(e) => {
                          setShowDeleteProjectModal(item?._id);
                          e.stopPropagation();
                        }}
                      >
                        <MdDelete className="text-primary text-lg" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-secondary my-2">No data found</p>
          )}
        </div>
        <div className={`flex items-center justify-center gap-x-2 `}>
          {userProfile?.projects?.length > displayedRemainingProjects && (
            <div className="flex items-center justify-center my-4">
              <button
                className="rounded-3xl px-3 py-1 border-primary border text-primary text-center active:scale-95"
                onClick={loadMoreProjects}
              >
                Load more
              </button>
            </div>
          )}
          {displayedRemainingProjects > 3 && (
            <div className="flex items-center justify-center my-4">
              <button
                className="rounded-3xl px-3 py-1 border-primary border text-primary text-center active:scale-95"
                onClick={showLessProjects}
              >
                Show less
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Skills Section  */}
      <div className="p-6">
        <p className="text-2xl font-semibold mb-4">
          Skills ({userProfile?.skills?.length})
        </p>
        <div className="flex items-center flex-wrap gap-2">
          {userProfile?.skills?.length > 0 ? (
            userProfile?.skills.map((item, index) => (
              <button
                className="rounded-3xl px-3 py-1 bg-primary bg-opacity-[0.18] text-secondary text-center active:scale-95 "
                key={index}
              >
                {item?.name}{" "}
              </button>
            ))
          ) : (
            <p className="text-secondary my-2">No data found</p>
          )}
        </div>
      </div>
      {/* Modals for adding, editing, and deleting languages and education */}
      <AnimatePresence initial={false} onExitComplete={() => null}>
        {showEditInfoModal && (
          <InfoModal
            setShowEditInfoModal={setShowEditInfoModal}
            initialData={infoEditData}
            userProfile={userProfile}
          />
        )}
        {showAddProjectModal && (
          <ProjectModal
            setShowAddProjectModal={setShowAddProjectModal}
            showAProjectgeModal={showAddProjectModal}
            userProfile={userProfile}
          />
        )}
        {showEditProjectModal && (
          <ProjectModal
            setShowAddProjectModal={setShowEditProjectModal}
            showAddProjectModal={showEditProjectModal}
            initialData={projectEditData}
            userProfile={userProfile}
            isEdit={true}
          />
        )}
        {showDeleteProjectModal && (
          <DeleteModal
            title="Project"
            loading={loading}
            onClose={() => setShowDeleteProjectModal(null)}
            onConfirm={() => handleDeleteProject()}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainContent;
