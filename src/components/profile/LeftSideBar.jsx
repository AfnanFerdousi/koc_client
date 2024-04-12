import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { getProfile } from "@/axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import EducationModal from "../modals/EducationModal";
import { FiPlus } from "react-icons/fi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import Modal from "../ui/Modal";
import { AnimatePresence } from "framer-motion";
import LanguageModal from "../modals/LanguageModal";
import DeleteModal from "../modals/DeleteModal";
import { setLoading } from "@/redux/reducers/loadingSlice";
import { deleteEducation, deleteLanguage } from "../../axios/axios";

const ProfileHeader = ({ userProfile, isMine }) => {
  // State variables for modals
  const [showAddLanguageModal, setShowAddLanguageModal] = useState(false);
  const [showDeleteLanguageModal, setShowDeleteLanguageModal] = useState(null);
  const [showEditLanguageModal, setShowEditLanguageModal] = useState(null);
  const [languageEditData, setLanguageEditData] = useState({
    name: "",
    efficiency: "",
  });
  const [showAddEducationModal, setShowAddEducationModal] = useState(false);
  const [showEditEducationModal, setShowEditEducationModal] = useState(null);
  const [showDeleteEducationModal, setShowDeleteEducationModal] =
    useState(null);
  const [editEducationData, setEditEducationData] = useState({
    school: "",
    degree: "",
    field_of_study: "",
    from: null,
    to: null,
    current: true,
    description: "",
  });

  // Redux state for loading
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();

  // Function to handle deletion of a language
  const handleDeleteLanguage = () => {
    dispatch(setLoading(true));
    dispatch(
      deleteLanguage({
        dynamicParams: {
          userId: userProfile?.user?._id,
          languageId: showDeleteLanguageModal,
        },
        bodyData: null,
      })
    )
      .then(() => dispatch(getProfile()))
      .then(() => {
        dispatch(setLoading(false));
        setShowDeleteLanguageModal(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        dispatch(setLoading(false));
      });
  };

  // Function to handle deletion of an education
  const handleDeleteEducation = () => {
    dispatch(setLoading(true));
    dispatch(
      deleteEducation({
        dynamicParams: {
          userId: userProfile?.user?._id,
          educationId: showDeleteEducationModal,
        },
        bodyData: null,
      })
    )
      .then(() => dispatch(getProfile()))
      .then(() => {
        dispatch(setLoading(false));
        setShowDeleteEducationModal(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        dispatch(setLoading(false));
      });
  };

  return (
    <div className="col-span-1 border-b lg:border-r">
      {/* Stats section */}
      <div className="flex items-center justify-between border-b p-6">
        {[
          { label: "Total earnings", value: userProfile?.amount_earned },
          {
            label: "Completed projects",
            value: userProfile?.completed_projects,
          },
          { label: "Active projects", value: userProfile?.active_projects },
        ].map((stat, index) => (
          <div key={index}>
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="text-sm text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Languages section */}
      <div className="p-6">
        <div className="mb-5">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold mb-2">Languages</p>
            <div
              className={`rounded-full p-[3px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all ${
                !isMine && "hidden"
              }`}
              onClick={() => setShowAddLanguageModal(true)}
            >
              <FiPlus className="text-primary text-lg" />
            </div>
          </div>
          {userProfile?.languages?.length > 0 ? (
            userProfile?.languages?.map((language, index) => (
              <div className="flex items-center justify-between" key={index}>
                <p className="font-medium mb-2">
                  {language?.name}:{" "}
                  <span className="font-normal">{language?.efficiency}</span>
                </p>
                <div
                  className={`flex items-center gap-x-2 ${!isMine && "hidden"}`}
                >
                  {[
                    {
                      Icon: MdEdit,
                      onClick: () => {
                        setShowEditLanguageModal(language?._id);
                        setLanguageEditData({
                          name: language?.name,
                          efficiency: language?.efficiency,
                        });
                      },
                    },
                    {
                      Icon: MdDelete,
                      onClick: () => setShowDeleteLanguageModal(language?._id),
                    },
                  ].map((action, index) => (
                    <div
                      key={index}
                      className="rounded-full p-[3px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all"
                    >
                      <action.Icon
                        className="text-primary text-lg"
                        onClick={action.onClick}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-secondary my-2">No data found</p>
          )}
        </div>

        {/* Verifications section */}
        <div className="mb-5">
          <p className="text-2xl font-semibold mb-2">Verifications</p>
          {[
            { label: "Phone", verified: userProfile?.phone_verified },
            { label: "Payment", verified: userProfile?.payment_verified },
          ].map((verification, index) => (
            <p key={index} className="font-medium mb-2 flex items-center">
              {verification.label}:{" "}
              {verification.verified ? (
                <>
                  <span className="mx-1 font-normal">Verified</span>
                  <RiVerifiedBadgeFill />
                </>
              ) : (
                <>
                  <span className="mx-1 font-normal">Unverified</span>
                  <RxCrossCircled />
                </>
              )}
            </p>
          ))}
        </div>

        {/* Education section */}
        <div className="mb-5">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold mb-2">Education</p>
            <div
              className={`rounded-full p-[3px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all ${
                !isMine && "hidden"
              }`}
              onClick={() => setShowAddEducationModal(true)}
            >
              <FiPlus className="text-primary text-lg" />
            </div>
          </div>
          {userProfile?.education?.length > 0 ? (
            userProfile?.education?.map((education, index) => (
              <div className="mb-2" key={index}>
                <div className="flex items-center justify-between">
                  <p className="font-medium  text-xl">{education?.school}</p>
                  <div
                    className={`flex items-center gap-x-2 ${
                      !isMine && "hidden"
                    }`}
                  >
                    {[
                      {
                        Icon: MdEdit,
                        onClick: () => {
                          setShowEditEducationModal(education?._id);
                          setEditEducationData({
                            school: education?.school,
                            field_of_study: education?.field_of_study,
                            degree: education?.degree,
                            current: education?.current,
                            description: education?.description,
                          });
                        },
                      },
                      {
                        Icon: MdDelete,
                        onClick: () =>
                          setShowDeleteEducationModal(education?._id),
                      },
                    ].map((action, index) => (
                      <div
                        key={index}
                        className="rounded-full p-[3px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all"
                      >
                        <action.Icon
                          className="text-primary text-lg"
                          onClick={action.onClick}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <p className="  text-lg text-secondary">
                  {format(new Date(education?.from), "MMMM, yyyy")} -{" "}
                  {education?.current
                    ? "Present"
                    : format(new Date(education?.to), "MMMM, yyyy")}
                </p>
                <p className="  text-lg text-secondary">
                  {education?.degree}, {education?.field_of_study}
                </p>
                <p className="  text-lg text-secondary">
                  {education?.description}
                </p>
              </div>
            ))
          ) : (
            <p className=" text-secondary my-2">No data found</p>
          )}
        </div>
      </div>

      {/* Modals for adding, editing, and deleting languages and education */}
      <AnimatePresence initial={false} onExitComplete={() => null}>
        {showAddLanguageModal && (
          <LanguageModal
            setShowAddLanguageModal={setShowAddLanguageModal}
            showAddLanguageModal={showAddLanguageModal}
            userProfile={userProfile}
          />
        )}
        {showEditLanguageModal && (
          <LanguageModal
            setShowAddLanguageModal={setShowEditLanguageModal}
            showAddLanguageModal={showEditLanguageModal}
            initialData={languageEditData}
            userProfile={userProfile}
            isEdit={true}
          />
        )}
        {showDeleteLanguageModal && (
          <DeleteModal
            title="Education"
            loading={loading}
            onClose={() => setShowDeleteLanguageModal(null)}
            onConfirm={() => handleDeleteLanguage()}
          />
        )}
        {showAddEducationModal && (
          <EducationModal
            setShowEducationModal={setShowAddEducationModal}
            showEducationModal={showAddEducationModal}
            userProfile={userProfile}
          />
        )}
        {showEditEducationModal && (
          <EducationModal
            setShowEducationModal={setShowEditEducationModal}
            showEducationModal={showEditEducationModal}
            userProfile={userProfile}
            initialData={editEducationData}
            isEdit={true}
          />
        )}
        {showDeleteEducationModal && (
          <DeleteModal
            title="Education"
            loading={loading}
            onClose={() => setShowDeleteEducationModal(null)}
            onConfirm={() => handleDeleteEducation()}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileHeader;
