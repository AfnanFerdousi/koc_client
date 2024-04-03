import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  MdDelete,
  MdEdit,
  MdOutlineEdit,
  MdOutlineLocationOn,
} from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FaStar } from "react-icons/fa6";
import { RxCross1, RxCrossCircled } from "react-icons/rx";
import { format } from "date-fns";
import Head from "next/head";
import MyExperiences from "@/components/profile/MyExperiences";
import { FiPlus } from "react-icons/fi";
import { AnimatePresence } from "framer-motion";
import Modal from "@/components/ui/Modal";
import {
  addEducation,
  addLanguage,
  addProject,
  deleteEducation,
  deleteLanguage,
  deleteProject,
  editEducation,
  editInfo,
  editLanguage,
  editProfile,
  editProject,
  getProfile,
} from "@/axios/axios";
import {
  setEducationLoading,
  setInfoLoading,
  setLanguageLoading,
  setProjectLoading,
} from "@/redux/reducers/experienceSlice";
import DeleteConfirmationModal from "@/components/ui/DeleteModal";
import { Avatar } from "@mui/material";
import { Rating, StickerStar } from "@smastrom/react-rating";
import Description from "@/components/ui/Description";
import axios from "axios";
export default function Profile() {
  const dispatch = useDispatch();
  // Selecting necessary data from Redux store
  const userProfile: any = useSelector((state: RootState) => state.auth?.data);
  const isLoading: boolean = useSelector(
    (state: RootState) => state.auth?.loading
  );
  const addLanguageLoading: boolean = useSelector(
    (state: RootState) => state.experience?.languageLoading
  );
  const addProjectLoading: boolean = useSelector(
    (state: RootState) => state.experience?.projectLoading
  );
  const editInfoLoading: boolean = useSelector(
    (state: RootState) => state.experience?.infoLoading
  );
  const [showAddLanguageModal, setShowAddLanguageModal] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showEditInfoModal, setShowEditInfoModal] = useState<string | null>(
    null
  );
  const [languageData, setLanguageData] = useState<any>({
    name: "",
    efficiency: "",
  });
  const [languageEditData, setLanguageEditData] = useState<any>({
    name: "",
    efficiency: "",
  });
  const [projectData, setProjectData] = useState<any>({
    title: "",
    link: "",
    image: "",
  });
  const [projectEditData, setProjectEditData] = useState<any>({
    title: "",
    link: "",
    image: "",
  });
  const [isLanguageSaveEnabled, setIsLanguageSaveEnabled] = useState(false);
  const [isLanguageEditEnabled, setIsLanguageEditEnabled] = useState(false);
  const [isProjectSaveEnabled, setIsProjectSaveEnabled] = useState(false);
  const [isProjectEditEnabled, setIsProjectEditEnabled] = useState(false);
  const [showDeleteLanguageModal, setShowDeleteLanguageModal] = useState<
    string | null
  >(null);
  const [showEditLanguageModal, setShowEditLanguageModal] = useState<
    string | null
  >(null);
  const [showEditProjectModal, setShowEditProjectModal] = useState<
    string | null
  >(null);
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState<
    string | null
  >(null);
  // Function to check form validity
  const checkLanguageForm = () => {
    const { name, efficiency } = languageData;
    setIsLanguageSaveEnabled(name && efficiency);
  };
  const checkLanguageEditForm = () => {
    const { name, efficiency } = languageEditData;
    setIsLanguageEditEnabled(name !== "" && efficiency !== "");
  };

  const checkProjectForm = () => {
    const { title, link, image } = projectData;
    setIsProjectSaveEnabled(title && link && image);
  };
  const checkProjectEditForm = () => {
    const { title, link, image } = projectEditData;
    setIsProjectEditEnabled(title && link && image);
  };

  const [imageLoading, setImageLoading] = useState(false);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event: any
  ) => {
    setImageLoading(true);
    const file = event.target.files[0];

    // Check if the file is an image
    if (file?.type?.startsWith("image/")) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload?key=3a1c90e62fd79d276ec757876690b3ef",
          formData
        );
        const imageUrl = response.data.data.url;
        setProjectData({ ...projectData, image: imageUrl });
        console.log("image", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      // Display error message or handle non-image file
      console.error("Please select an image file.");
    }

    setImageLoading(false);
  };
  const [pfpLoading, setPfpLoading] = useState(false);
  const handleDPChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event: any
  ) => {
    setPfpLoading(true);
    const file = event.target.files[0];

    // Check if the file is an image
    if (file?.type?.startsWith("image/")) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload?key=3a1c90e62fd79d276ec757876690b3ef",
          formData
        );
        const imageUrl = response.data.data.url;
        await dispatch(
          editProfile({
            userId: userProfile?.user?._id,
            userData: { profile_picture: imageUrl },
          })
        );
        await dispatch(getProfile());
        console.log("image", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      // Display error message or handle non-image file
      console.error("Please select an image file.");
    }

    setPfpLoading(false);
  };
  const [imageEditLoading, setImageEditLoading] = useState(false);

  const handleEditFileChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async (event: any) => {
    setImageEditLoading(true);
    const file = event.target.files[0];

    // Check if the file is an image
    if (file?.type?.startsWith("image/")) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload?key=3a1c90e62fd79d276ec757876690b3ef",
          formData
        );
        const imageUrl = response.data.data.url;
        setProjectEditData({ ...projectEditData, image: imageUrl });
        console.log("image", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      // Display error message or handle non-image file
      console.error("Please select an image file.");
    }

    setImageEditLoading(false);
  };
  useEffect(() => {
    // Call checkLanguageForm whenever formData changes
    checkLanguageEditForm();
  }, [languageEditData]);
  useEffect(() => {
    // Call checkLanguageForm whenever formData changes
    checkLanguageForm();
  }, [languageData]);
  useEffect(() => {
    // Call checkLanguageForm whenever formData changes
    checkProjectForm();
  }, [projectData]);
  useEffect(() => {
    // Call checkLanguageForm whenever formData changes
    checkProjectEditForm();
  }, [projectEditData]);

  // Function to handle saving experience data
  const handleSaveLanguage = () => {
    if (isLanguageSaveEnabled) {
      dispatch(setLanguageLoading(true));
      dispatch(
        addLanguage({
          userId: userProfile?.user?._id,
          languageData: languageData,
        })
      )
        .then(() => {
          // After adding experience, fetch the updated profile data
          return dispatch(getProfile());
        })
        .then(() => {
          // Once profile is fetched, reset loading state and close modal
          dispatch(setLanguageLoading(false));
          setShowAddLanguageModal(false);
        })
        .catch((error: any) => {
          console.error("Error:", error);
          dispatch(setLanguageLoading(false));
        });
    } else {
      console.error("Incomplete form fields");
    }
  };
  const handleEditLanguage = () => {
    if (isLanguageEditEnabled) {
      dispatch(setLanguageLoading(true));
      dispatch(
        editLanguage({
          userId: userProfile?.user?._id,
          languageId: showEditLanguageModal,
          languageData: languageData,
        })
      )
        .then(() => {
          // After adding experience, fetch the updated profile data
          return dispatch(getProfile());
        })
        .then(() => {
          // Once profile is fetched, reset loading state and close modal
          dispatch(setLanguageLoading(false));
          setShowEditLanguageModal(null);
        })
        .catch((error: any) => {
          console.error("Error:", error);
          dispatch(setLanguageLoading(false));
        });
    } else {
      console.error("Incomplete form fields");
    }
  };
  const [infoEditData, setInfoEditData] = useState<any>({
    sub_title: "",
    description: "",
  });
  const [isInfoEditEnabled, setIsInfoEditEnabled] = useState(false);

  const checkInfoEditForm = () => {
    const { sub_title, description } = infoEditData;
    setIsInfoEditEnabled(sub_title !== "" && description !== "");
  };
  useEffect(() => {
    // Call checkInfoForm whenever formData changes
    checkInfoEditForm();
  }, [infoEditData]);

  const handleEditInfo = () => {
    if (isInfoEditEnabled) {
      dispatch(setInfoLoading(true));
      dispatch(
        editInfo({
          userId: showEditInfoModal,
          userData: infoEditData,
        })
      )
        .then(() => {
          // After adding experience, fetch the updated profile data
          return dispatch(getProfile());
        })
        .then(() => {
          // Once profile is fetched, reset loading state and close modal
          dispatch(setInfoLoading(false));
          setShowEditInfoModal(null);
        })
        .catch((error: any) => {
          console.error("Error:", error);
          dispatch(setInfoLoading(false));
        });
    } else {
      console.error("Incomplete form fields");
    }
  };
  // Function to handle saving experience data
  const handleSaveProject = () => {
    console.log(projectData);
    if (isProjectSaveEnabled) {
      dispatch(setProjectLoading(true));
      dispatch(
        addProject({
          userId: userProfile?.user?._id,
          projectData: projectData,
        })
      )
        .then(() => {
          // After adding experience, fetch the updated profile data
          return dispatch(getProfile());
        })
        .then(() => {
          // Once profile is fetched, reset loading state and close modal
          dispatch(setProjectLoading(false));
          setShowAddProjectModal(false);
        })
        .catch((error: any) => {
          console.error("Error:", error);
          dispatch(setProjectLoading(false));
        });
    } else {
      console.error("Incomplete form fields");
    }
  };
  const handleEditProject = () => {
    if (isProjectEditEnabled) {
      dispatch(setProjectLoading(true));
      dispatch(
        editProject({
          userId: userProfile?.user?._id,
          projectId: showEditProjectModal,
          projectData: projectEditData,
        })
      )
        .then(() => {
          // After adding experience, fetch the updated profile data
          return dispatch(getProfile());
        })
        .then(() => {
          // Once profile is fetched, reset loading state and close modal
          dispatch(setProjectLoading(false));
          setShowAddProjectModal(false);
        })
        .catch((error: any) => {
          console.error("Error:", error);
          dispatch(setProjectLoading(false));
        });
    } else {
      console.error("Incomplete form fields");
    }
  };

  useEffect(() => {
    // Reset form data when the modal is closed
    if (!showAddLanguageModal) {
      setLanguageData({
        name: "",
        efficiency: "",
      });
    }
  }, [showAddLanguageModal]);
  useEffect(() => {
    // Reset form data when the modal is closed
    if (!showAddProjectModal) {
      setProjectData({
        title: "",
        link: "",
        image: "",
      });
    }
  }, [showAddProjectModal]);

  // Log profile data for debugging
  useEffect(() => {
    console.log("profile", userProfile);
  }, [userProfile]);

  const handleDeleteLanguage = () => {
    dispatch(setLanguageLoading(true));
    dispatch(
      deleteLanguage({
        userId: userProfile?.user?._id,
        languageId: showDeleteLanguageModal,
      })
    )
      .then(() => {
        // After adding Language, fetch the updated profile data
        return dispatch(getProfile());
      })
      .then(() => {
        // Once profile is fetched, reset loading state and close modal
        dispatch(setLanguageLoading(false));
        setShowDeleteLanguageModal(null);
      })
      .catch((error: any) => {
        console.error("Error:", error);
        dispatch(setLanguageLoading(false));
      });
  };

  const handleDeleteProject = () => {
    dispatch(setProjectLoading(true));
    dispatch(
      deleteProject({
        userId: userProfile?.user?._id,
        projectId: showDeleteProjectModal,
      })
    )
      .then(() => {
        // After adding Project, fetch the updated profile data
        return dispatch(getProfile());
      })
      .then(() => {
        // Once profile is fetched, reset loading state and close modal
        dispatch(setProjectLoading(false));
        setShowDeleteProjectModal(null);
      })
      .catch((error: any) => {
        console.error("Error:", error);
        dispatch(setLanguageLoading(false));
      });
  };
  // education ##############################

  const addExperienceLoading: boolean = useSelector(
    (state: RootState) => state.experience?.educationLoading
  );
  const ediExperienceLoading: boolean = useSelector(
    (state: RootState) => state.experience?.educationEditLoading
  );

  // State variables
  const [showAddExperienceModal, setShowAddExperienceModal] = useState(false);
  const [showEditExperienceModal, setShowEditExperienceModal] = useState<
    string | null
  >(null);
  const [showDeleteExperienceModal, setShowDeleteExperienceModal] = useState<
    string | null
  >(null);

  const [formData, setFormData] = useState<any>({
    school: "",
    degree: "",
    field_of_study: "",
    from: null,
    to: null,
    current: true,
    description: "",
  });
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [dateError, setDateError] = useState(false);
  // Function to check form validity
  const checkFormValidity = () => {
    const { school, degree, field_of_study, from, current, to } = formData;
    setIsSaveEnabled(
      school && degree && field_of_study && from && (current || to)
    );
  };

  useEffect(() => {
    // Update 'from' property when 'fromMonth' or 'fromYear' changes
    const { fromMonth, fromYear } = formData;
    if (fromMonth && fromYear) {
      const from = new Date(`${fromYear}-${fromMonth}-01`);
      setFormData((prev: any) => ({ ...prev, from }));
    }
    setDateError(false);
  }, [formData.fromMonth, formData.fromYear]);

  useEffect(() => {
    // Update 'to' property when 'toMonth' or 'toYear' changes
    const { toMonth, toYear } = formData;
    if (toMonth && toYear) {
      const to = new Date(`${toYear}-${toMonth}-01`);
      setFormData((prev: any) => ({ ...prev, to }));
    }
    setDateError(false);
  }, [formData.toMonth, formData.toYear]);

  useEffect(() => {
    // Call checkFormValidity whenever formData changes
    checkFormValidity();
  }, [formData]);

  // Function to handle saving experience data
  const handleSaveExperience = () => {
    if (isSaveEnabled) {
      const { from, to, current } = formData;
      const fromDate = new Date(from);
      const toDate = new Date(to);

      if (fromDate > toDate && !current) {
        setDateError(true);
        return; // Stop execution if the validation fails
      }

      let formattedFormData = { ...formData };
      if (from)
        formattedFormData.from = format(
          new Date(from),
          "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
        );
      if (!formData.current && to)
        formattedFormData.to = format(
          new Date(to),
          "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
        );

      dispatch(setEducationLoading(true));
      dispatch(
        addEducation({
          userId: userProfile?.user?._id,
          educationData: formattedFormData,
        })
      )
        .then(() => {
          // After adding experience, fetch the updated profile data
          return dispatch(getProfile());
        })
        .then(() => {
          // Once profile is fetched, reset loading state and close modal
          dispatch(setEducationLoading(false));
          setShowAddExperienceModal(false);
        })
        .catch((error: any) => {
          console.error("Error:", error);
          dispatch(setEducationLoading(false));
        });
    } else {
      console.error("Incomplete form fields");
    }
  };
  const [formEditData, setFormEditData] = useState<any>({
    school: "",
    degree: "",
    field_of_study: "",
    from: null,
    to: null,
    current: true,
    description: "",
  });
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [dateEditError, setDateEditError] = useState(false);
  // Function to check form validity
  const checkEditFormValidity = () => {
    const { school, degree, field_of_study, from, current, to } = formEditData;
    setIsEditEnabled(
      school && degree && field_of_study && from && (current || to)
    );
  };

  useEffect(() => {
    // Update 'from' property when 'fromMonth' or 'fromYear' changes
    const { fromMonth, fromYear } = formEditData;
    if (fromMonth && fromYear) {
      const from = new Date(`${fromYear}-${fromMonth}-01`);
      setFormEditData((prev: any) => ({ ...prev, from }));
    }
    setDateEditError(false);
  }, [formEditData.fromMonth, formEditData.fromYear]);

  useEffect(() => {
    // Update 'to' property when 'toMonth' or 'toYear' changes
    const { toMonth, toYear } = formEditData;
    if (toMonth && toYear) {
      const to = new Date(`${toYear}-${toMonth}-01`);
      setFormEditData((prev: any) => ({ ...prev, to }));
    }
    setDateEditError(false);
  }, [formEditData.toMonth, formEditData.toYear]);

  useEffect(() => {
    // Call checkEditFormValidity whenever formEditData changes
    checkEditFormValidity();
  }, [formEditData]);

  // Function to handle saving experience data
  const handleEditExperience = () => {
    if (isEditEnabled) {
      const { from, to, current } = formEditData;
      const fromDate = new Date(from);
      const toDate = new Date(to);

      if (fromDate > toDate && !current) {
        setDateEditError(true);
        return; // Stop execution if the validation fails
      }

      let formattedFormEditData = { ...formEditData };
      if (from)
        formattedFormEditData.from = format(
          new Date(from),
          "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
        );
      if (!formEditData.current && to)
        formattedFormEditData.to = format(
          new Date(to),
          "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
        );

      dispatch(setEducationLoading(true));
      dispatch(
        editEducation({
          userId: userProfile?.user?._id,
          educationId: showEditExperienceModal,
          educationData: formattedFormEditData,
        })
      )
        .then(() => {
          // After adding experience, fetch the updated profile data
          return dispatch(getProfile());
        })
        .then(() => {
          // Once profile is fetched, reset loading state and close modal
          dispatch(setEducationLoading(false));
          setShowEditExperienceModal(null);
        })
        .catch((error: any) => {
          console.error("Error:", error);
          dispatch(setEducationLoading(false));
        });
    } else {
      console.error("Incomplete form fields");
    }
  };

  useEffect(() => {
    // Reset form data when the modal is closed
    if (!showAddExperienceModal) {
      setFormData({
        school: "",
        field_of_study: "",
        degree: "",
        from: null,
        to: null,
        current: false,
        description: "",
      });
    }
  }, [showAddExperienceModal]);

  const handleDeleteExperience = () => {
    dispatch(setEducationLoading(true));
    dispatch(
      deleteEducation({
        userId: userProfile?.user?._id,
        educationId: showDeleteExperienceModal,
      })
    )
      .then(() => {
        // After adding experience, fetch the updated profile data
        return dispatch(getProfile());
      })
      .then(() => {
        // Once profile is fetched, reset loading state and close modal
        dispatch(setEducationLoading(false));
        setShowDeleteExperienceModal(null);
      })
      .catch((error: any) => {
        console.error("Error:", error);
        dispatch(setEducationLoading(false));
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
    <div>
      <Head>
        <title>My Profile || KocFreelancing</title>
      </Head>
      <Navbar />
      {isLoading ? (
        <div className="border rounded-3xl max-w-screen-xl flex items-center justify-center h-[80vh] mt-28 mb-14 mx-auto">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="border rounded-3xl max-w-screen-xl mt-28 mx-auto">
            <div className="flex justify-between p-6 border-b">
              <div className="flex items-center gap-x-8 ">
                {userProfile?.user?.profile_picture ? (
                  !pfpLoading ? (
                    <label
                      htmlFor="pfpUpload"
                      className="w-[112px] h-[112px] border rounded-full hover:cursor-pointer relative"
                    >
                      <img
                        src={userProfile?.user?.profile_picture}
                        width={112}
                        height={112}
                        alt="profile picture"
                        className="object-cover rounded-full w-full h-full"
                      />
                      <div className="absolute bottom-0 right-0 rounded-full p-[5px] hover:bg-opacity-80 border-[2px] border-primary bg-gray-50 cursor-pointer transition-all">
                        <MdEdit className="text-primary text-lg" />
                      </div>
                      <input
                        type="file"
                        id="pfpUpload"
                        name="pfpUpload"
                        accept="image/*"
                        onChange={handleDPChange}
                        className="hidden"
                        required
                      />
                    </label>
                  ) : (
                    <div
                      className={`px-4 py-4 font-medium      shadow-sm hover:bg-opacity-90 transition-all focus:outline-none  cursor-context-menu w-[112px] h-[112px] border rounded-full flex items-center justify-center`}
                    >
                      <div className="loader mx-auto"></div>
                    </div>
                  )
                ) : !pfpLoading ? (
                  <label
                    htmlFor="pfpUpload"
                    className="w-[112px] h-[112px] border rounded-full hover:cursor-pointer relative"
                  >
                    <Avatar
                      sx={{
                        width: 112,
                        height: 112,
                        backgroundColor: "#35B900",
                        color: "white",
                        fontSize: 24,
                      }}
                    >
                      {(userProfile?.first_name?.slice(0, 1) ?? "") +
                        (userProfile?.lastName?.slice(0, 1) ?? "")}
                    </Avatar>
                    <div className="absolute bottom-0 right-0 rounded-full p-[5px] hover:bg-opacity-80 border-[2px] border-primary bg-gray-50 cursor-pointer transition-all">
                      <MdEdit className="text-primary text-lg" />
                    </div>
                    <input
                      type="file"
                      id="pfpUpload"
                      name="pfpUpload"
                      accept="image/*"
                      onChange={handleDPChange}
                      className="hidden"
                      required
                    />
                  </label>
                ) : (
                  <div
                    className={`px-4 py-4 font-medium      shadow-sm hover:bg-opacity-90 transition-all focus:outline-none  cursor-context-menu w-[112px] h-[112px] border rounded-full flex items-center justify-center`}
                  >
                    <div className="loader mx-auto"></div>
                  </div>
                )}

                <div>
                  <p className="text-4xl font-semibold">
                    {userProfile?.user?.first_name +
                      " " +
                      userProfile?.user?.lastName}
                  </p>
                  <p className="flex items-center mt-2">
                    <MdOutlineLocationOn className="w-6 h-6 mr-1 -ml-1 text-secondary" />
                    <span className="text-lg text-secondary">
                      {userProfile?.location} -{" "}
                      {new Date().toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}{" "}
                      local time{" "}
                    </span>
                  </p>
                  <div className="mt-1 text-secondary flex items-center gap-x-2 font-medium">
                    <Rating
                      style={{ maxWidth: 100 }}
                      value={userProfile?.overall_rating}
                      readOnly
                      itemStyles={{
                        itemShapes: StickerStar,
                        activeFillColor: "#35B900",
                        inactiveFillColor: "#cecece",
                      }}
                    />

                    <p className="font-medium  text-secondary">
                      {" "}
                      {userProfile?.overall_rating?.toFixed(2)}
                    </p>
                    <p>({userProfile?.completed_projects} reviews)</p>
                  </div>
                </div>
              </div>
              <button className="flex items-center cursor-pointer active:scale-95">
                <p className="text-lg text-primary mr-1">Share</p>
                <IoShareSocial className="w-6 h-6 text-primary" />
              </button>
            </div>
            <div className="grid grid-cols-3">
              <div className="col-span-1 border-r  ">
                <div className="flex items-center justify-between border-b p-6">
                  <div>
                    <p className="text-2xl font-semibold">
                      $ {userProfile?.amount_earned}
                    </p>
                    <p className="text-sm text-secondary ">Total earnings</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">
                      {userProfile?.completed_projects}
                    </p>
                    <p className="text-sm text-secondary ">
                      Completed projects
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">
                      {" "}
                      {userProfile?.active_projects}
                    </p>
                    <p className="text-sm text-secondary ">Active projects</p>
                  </div>
                </div>
                <div className=" p-6">
                  <div className="mb-5">
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-semibold mb-2">Languages</p>
                      <div className="rounded-full p-[3px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all">
                        <FiPlus
                          className="text-primary text-lg"
                          onClick={() => setShowAddLanguageModal(true)}
                        />
                        <AnimatePresence
                          initial={false}
                          onExitComplete={() => null}
                        >
                          {showAddLanguageModal && (
                            <Modal>
                              <div className="p-8 rounded-2xl bg-white min-w-[480px] max-w-lg relative">
                                <div className="flex flex-col max-h-[80vh] p-1 overflow-y-auto">
                                  <div className="flex items-center justify-between">
                                    <p className="text-3xl font-semibold">
                                      Add language skill
                                    </p>
                                    <RxCross1
                                      className="text-2xl cursor-pointer"
                                      onClick={() =>
                                        setShowAddLanguageModal(false)
                                      }
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-4 my-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                      <label
                                        htmlFor="name"
                                        className="col-span-full font-medium"
                                      >
                                        Language Name
                                      </label>
                                      <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={languageData.name}
                                        onChange={(e) =>
                                          setLanguageData({
                                            ...languageData,
                                            name: e.target.value,
                                          })
                                        }
                                        className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="Ex: English"
                                        required
                                      />
                                    </div>
                                    <div className="">
                                      {/* Input field for job title */}
                                      <label
                                        htmlFor="efficiency"
                                        className="col-span-full font-medium "
                                      >
                                        Efficiency
                                      </label>
                                      <select
                                        id="efficiency"
                                        name="efficiency"
                                        value={languageData.efficiency}
                                        onChange={(e) =>
                                          setLanguageData({
                                            ...languageData,
                                            efficiency: e.target.value,
                                          })
                                        }
                                        className="cursor-pointer px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full my-2"
                                        required
                                      >
                                        <option value="">
                                          Select Efficiency
                                        </option>
                                        <option value="Basic">Basic</option>
                                        <option value="Conversational">
                                          Conversational
                                        </option>
                                        <option value="Fluent">Fluent</option>
                                        <option value="Native">Native</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between space-x-2 pt-3 border-t">
                                  <button
                                    type="button"
                                    className="px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none w-full"
                                    onClick={() =>
                                      setShowAddLanguageModal(false)
                                    }
                                  >
                                    Cancel
                                  </button>
                                  {addLanguageLoading ? (
                                    <button
                                      type="button"
                                      className={`px-4 py-4 font-medium text-white bg-primary bg-opacity-80 border border-transparent rounded-md shadow-sm hover:bg-opacity-90 transition-all focus:outline-none w-full cursor-context-menu  `}
                                    >
                                      <div className="loaderProfile mx-auto"></div>
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className={`px-4 py-3 font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-opacity-90 transition-all focus:outline-none w-full ${
                                        isLanguageSaveEnabled
                                          ? ""
                                          : "opacity-50 cursor-not-allowed"
                                      }`}
                                      onClick={handleSaveLanguage}
                                      disabled={!isLanguageSaveEnabled}
                                    >
                                      Save
                                    </button>
                                  )}
                                </div>
                              </div>
                            </Modal>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    {userProfile?.languages?.length > 0 ? (
                      userProfile?.languages?.map(
                        (item: any, index: React.Key | null | undefined) => (
                          <div
                            className="flex items-center justify-between"
                            key={index}
                          >
                            <p className="font-medium mb-2">
                              {item?.name}:{" "}
                              <span className="font-normal">
                                {item?.efficiency}
                              </span>
                            </p>
                            <div className="flex items-center gap-x-2">
                              <div className="rounded-full p-[3px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all">
                                <MdEdit
                                  className="text-primary text-lg"
                                  onClick={() => {
                                    setShowEditLanguageModal(item?._id);
                                    setLanguageEditData({
                                      name: item?.name,
                                      efficiency: item?.efficiency,
                                    });
                                  }}
                                />
                                <AnimatePresence
                                  initial={false}
                                  onExitComplete={() => null}
                                >
                                  {showEditLanguageModal && (
                                    <Modal>
                                      <div className="p-8 rounded-2xl bg-white min-w-[480px] max-w-lg relative">
                                        <div className="flex flex-col max-h-[80vh] p-1 overflow-y-auto">
                                          <div className="flex items-center justify-between">
                                            <p className="text-3xl font-semibold">
                                              Edit language skill
                                            </p>
                                            <RxCross1
                                              className="text-2xl cursor-pointer"
                                              onClick={() =>
                                                setShowEditLanguageModal(null)
                                              }
                                            />
                                          </div>
                                          <div className="flex flex-col space-y-4 my-4">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                              <label
                                                htmlFor="name"
                                                className="col-span-full font-medium"
                                              >
                                                Language Name
                                              </label>
                                              <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={languageEditData.name}
                                                onChange={(e) =>
                                                  setLanguageEditData({
                                                    ...languageEditData,
                                                    name: e.target.value,
                                                  })
                                                }
                                                className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                                placeholder="Ex: English"
                                                required
                                              />
                                            </div>
                                            <div className="">
                                              {/* Input field for job title */}
                                              <label
                                                htmlFor="efficiency"
                                                className="col-span-full font-medium "
                                              >
                                                Efficiency
                                              </label>
                                              <select
                                                id="efficiency"
                                                name="efficiency"
                                                value={
                                                  languageEditData.efficiency
                                                }
                                                onChange={(e) =>
                                                  setLanguageEditData({
                                                    ...languageEditData,
                                                    efficiency: e.target.value,
                                                  })
                                                }
                                                className="cursor-pointer px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full my-2"
                                                required
                                              >
                                                <option value="">
                                                  Select Efficiency
                                                </option>
                                                <option value="Basic">
                                                  Basic
                                                </option>
                                                <option value="Conversational">
                                                  Conversational
                                                </option>
                                                <option value="Fluent">
                                                  Fluent
                                                </option>
                                                <option value="Native">
                                                  Native
                                                </option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex items-center justify-between space-x-2 pt-3 border-t">
                                          <button
                                            type="button"
                                            className="px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none w-full"
                                            onClick={() =>
                                              setShowEditLanguageModal(null)
                                            }
                                          >
                                            Cancel
                                          </button>
                                          {addLanguageLoading ? (
                                            <button
                                              type="button"
                                              className={`px-4 py-4 font-medium text-white bg-primary bg-opacity-80 border border-transparent rounded-md shadow-sm hover:bg-opacity-90 transition-all focus:outline-none w-full cursor-context-menu  `}
                                            >
                                              <div className="loaderProfile mx-auto"></div>
                                            </button>
                                          ) : (
                                            <button
                                              type="button"
                                              className={`px-4 py-3 font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-opacity-90 transition-all focus:outline-none w-full ${
                                                isLanguageEditEnabled
                                                  ? ""
                                                  : "opacity-50 cursor-not-allowed"
                                              }`}
                                              onClick={handleEditLanguage}
                                              disabled={!isLanguageEditEnabled}
                                            >
                                              Save
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </Modal>
                                  )}
                                </AnimatePresence>
                              </div>
                              <div className="rounded-full p-[3px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all">
                                <MdDelete
                                  className="text-primary text-lg"
                                  onClick={() =>
                                    setShowDeleteLanguageModal(item?._id)
                                  }
                                />
                                <AnimatePresence
                                  initial={false}
                                  onExitComplete={() => null}
                                >
                                  {showDeleteLanguageModal && (
                                    <DeleteConfirmationModal
                                      title="Education"
                                      onClose={() =>
                                        setShowDeleteLanguageModal(null)
                                      }
                                      onConfirm={() => handleDeleteLanguage()}
                                    />
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <p className=" text-secondary my-2">No data found </p>
                    )}
                  </div>
                  <div className="mb-5">
                    <p className="text-2xl font-semibold mb-2">Verifications</p>
                    <p className="font-medium mb-2 flex items-center">
                      Phone:{" "}
                      {userProfile?.phone_verified ? (
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
                    <p className="font-medium mb-2 flex items-center">
                      Payment:{" "}
                      {userProfile?.payment_verified ? (
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
                  </div>
                  <div className="mb-5">
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-semibold mb-2">Education</p>
                      <div className="rounded-full p-[3px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all">
                        <FiPlus
                          className="text-primary text-lg"
                          onClick={() => setShowAddExperienceModal(true)}
                        />
                        <AnimatePresence
                          initial={false}
                          onExitComplete={() => null}
                        >
                          {showAddExperienceModal && (
                            <Modal>
                              <div className="p-8 rounded-2xl bg-white min-w-[768px] max-w-lg relative">
                                <div className="flex flex-col max-h-[80vh] p-1 overflow-y-auto">
                                  <div className="flex items-center justify-between">
                                    <p className="text-3xl font-semibold">
                                      Add education
                                    </p>
                                    <RxCross1
                                      className="text-2xl cursor-pointer"
                                      onClick={() =>
                                        setShowAddExperienceModal(false)
                                      }
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-4 my-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                      <label
                                        htmlFor="school"
                                        className="col-span-full font-medium"
                                      >
                                        school
                                      </label>
                                      <input
                                        type="text"
                                        id="school"
                                        name="school"
                                        value={formData.school}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            school: e.target.value,
                                          })
                                        }
                                        className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="Ex: Oxford University"
                                        required
                                      />
                                    </div>
                                    <div className="flex items-center justify-between gap-3">
                                      {/* Input fields for city and country */}
                                      <div className="w-full">
                                        <label
                                          htmlFor="field_of_study"
                                          className=" font-medium"
                                        >
                                          Field of study
                                        </label>
                                        <input
                                          type="text"
                                          id="field_of_study"
                                          name="field_of_study"
                                          value={formData.field_of_study}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formData,
                                              field_of_study: e.target.value,
                                            })
                                          }
                                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                          placeholder="Ex. Computer Science"
                                          required
                                        />
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                      {/* Input field for job title */}
                                      <label
                                        htmlFor="degree"
                                        className="col-span-full font-medium"
                                      >
                                        degree
                                      </label>
                                      <input
                                        type="text"
                                        id="degree"
                                        name="degree"
                                        value={formData.degree}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            degree: e.target.value,
                                          })
                                        }
                                        className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="Ex: Software Engineer"
                                        required
                                      />
                                    </div>
                                    {/* From and To */}
                                    <div className="flex items-center justify-between gap-3">
                                      {/* Input fields for From month and year */}
                                      <div className="w-1/2">
                                        <label
                                          htmlFor="fromMonth"
                                          className="font-medium"
                                        >
                                          From Month
                                        </label>
                                        <select
                                          id="fromMonth"
                                          name="fromMonth"
                                          value={formData.fromMonth}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formData,
                                              fromMonth: e.target.value,
                                            })
                                          }
                                          className="cursor-pointer px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full"
                                          required
                                        >
                                          <option value="">Select Month</option>
                                          <option value="1">January</option>
                                          <option value="2">February</option>
                                          <option value="3">March</option>
                                          <option value="4">April</option>
                                          <option value="5">May</option>
                                          <option value="6">June</option>
                                          <option value="7">July</option>
                                          <option value="8">August</option>
                                          <option value="9">September</option>
                                          <option value="10">October</option>
                                          <option value="11">November</option>
                                          <option value="12">December</option>
                                        </select>
                                      </div>
                                      <div className="w-1/2">
                                        <label
                                          htmlFor="fromYear"
                                          className="font-medium"
                                        >
                                          From Year
                                        </label>
                                        <select
                                          id="fromYear"
                                          name="fromYear"
                                          value={formData.fromYear}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formData,
                                              fromYear: e.target.value,
                                            })
                                          }
                                          className="cursor-pointer px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full"
                                          required
                                        >
                                          <option value="">Select Year</option>
                                          {Array.from(
                                            { length: 25 },
                                            (_, i) => 2000 + i
                                          ).map((year) => (
                                            <option key={year} value={year}>
                                              {year}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                    <div
                                      className={`flex items-center justify-between gap-3 ${
                                        formData.current && "hidden"
                                      }`}
                                    >
                                      {/* Input fields for To month and year */}
                                      <div className="w-1/2">
                                        <label
                                          htmlFor="toMonth"
                                          className="font-medium"
                                        >
                                          To Month
                                        </label>
                                        <select
                                          id="toMonth"
                                          name="toMonth"
                                          value={formData.toMonth}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formData,
                                              toMonth: e.target.value,
                                            })
                                          }
                                          className="cursor-pointer px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full"
                                        >
                                          <option value="">Select Month</option>
                                          <option value="1">January</option>
                                          <option value="2">February</option>
                                          <option value="3">March</option>
                                          <option value="4">April</option>
                                          <option value="5">May</option>
                                          <option value="6">June</option>
                                          <option value="7">July</option>
                                          <option value="8">August</option>
                                          <option value="9">September</option>
                                          <option value="10">October</option>
                                          <option value="11">November</option>
                                          <option value="12">December</option>
                                        </select>
                                      </div>
                                      <div className="w-1/2">
                                        <label
                                          htmlFor="toYear"
                                          className="font-medium"
                                        >
                                          To Year
                                        </label>
                                        <select
                                          id="toYear"
                                          name="toYear"
                                          value={formData.toYear}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formData,
                                              toYear: e.target.value,
                                            })
                                          }
                                          className="cursor-pointer px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full"
                                        >
                                          <option value="">Select Year</option>
                                          {Array.from(
                                            { length: 25 },
                                            (_, i) => 2000 + i
                                          ).map((year) => (
                                            <option key={year} value={year}>
                                              {year}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                    {/* Checkbox and Description */}
                                    <div className="flex items-center">
                                      <div className="inline-flex items-center">
                                        <label
                                          className="relative flex cursor-pointer items-center rounded-full p-2"
                                          htmlFor="checkbox-1"
                                          data-ripple-dark="true"
                                        >
                                          <input
                                            type="checkbox"
                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute checked:border-primary checked:bg-primary"
                                            id="checkbox-1"
                                            checked={formData.current}
                                            onChange={() =>
                                              setFormData({
                                                ...formData,
                                                current: !formData.current,
                                              })
                                            }
                                          />
                                          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-3.5 w-3.5"
                                              viewBox="0 0 20 20"
                                              fill="currentColor"
                                              stroke="currentColor"
                                              strokeWidth={1}
                                            >
                                              <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                          </div>
                                        </label>
                                      </div>
                                      <p className="text-lg text-secondary">
                                        I currently study here
                                      </p>
                                    </div>
                                    <div>
                                      {/* Input field for description */}
                                      <h3 className="font-medium">
                                        Description (Optional)
                                      </h3>
                                      <div className="mt-2">
                                        <textarea
                                          id="description"
                                          rows={3}
                                          value={formData.description}
                                          onChange={(e) =>
                                            setFormData({
                                              ...formData,
                                              description: e.target.value,
                                            })
                                          }
                                          className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                                          placeholder="Enter description"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {dateError && (
                                  <p className="text-red-500">
                                    Ending date cannot be earlier than starting
                                    date.
                                  </p>
                                )}
                                <div className="flex items-center justify-between space-x-2 pt-3 border-t">
                                  <button
                                    type="button"
                                    className="px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none w-full"
                                    onClick={() =>
                                      setShowAddExperienceModal(false)
                                    }
                                  >
                                    Cancel
                                  </button>
                                  {addExperienceLoading ? (
                                    <button
                                      type="button"
                                      className={`px-4 py-4 font-medium text-white bg-primary bg-opacity-80 border border-transparent rounded-md shadow-sm hover:bg-opacity-90 transition-all focus:outline-none w-full cursor-context-menu  `}
                                    >
                                      <div className="loaderProfile mx-auto"></div>
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className={`px-4 py-3 font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-opacity-90 transition-all focus:outline-none w-full ${
                                        isSaveEnabled
                                          ? ""
                                          : "opacity-50 cursor-not-allowed"
                                      }`}
                                      onClick={handleSaveExperience}
                                      disabled={!isSaveEnabled}
                                    >
                                      Save
                                    </button>
                                  )}
                                </div>
                              </div>
                            </Modal>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    {userProfile?.education?.length > 0 ? (
                      userProfile?.education?.map(
                        (
                          item: {
                            description: any;
                            field_of_study: any;
                            _id: string;
                            school: string;
                            degree: string;
                            from: string;
                            current: any;
                            to: any;
                          },
                          index: React.Key | null | undefined
                        ) => (
                          <div className="mb-2" key={index}>
                            <div className="flex items-center justify-between">
                              <p className="font-medium  text-xl">
                                {item?.school}
                              </p>
                              <div className="flex items-center gap-x-2">
                                <div className="rounded-full p-[3px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all">
                                  <MdEdit
                                    className="text-primary text-lg"
                                    onClick={() => {
                                      setShowEditExperienceModal(item?._id);
                                      setFormEditData({
                                        school: item?.school,
                                        field_of_study: item?.field_of_study,
                                        degree: item?.degree,
                                        current: item?.current,
                                        description: item?.description,
                                      });
                                    }}
                                  />

                                  <AnimatePresence
                                    initial={false}
                                    onExitComplete={() => null}
                                  >
                                    {showEditExperienceModal && (
                                      <Modal>
                                        <div className="p-8 rounded-2xl bg-white min-w-[768px] max-w-lg relative">
                                          <div className="flex flex-col max-h-[80vh] p-1 overflow-y-auto">
                                            <div className="flex items-center justify-between">
                                              <p className="text-3xl font-semibold">
                                                Edit education
                                              </p>
                                              <RxCross1
                                                className="text-2xl cursor-pointer"
                                                onClick={() =>
                                                  setShowEditExperienceModal(
                                                    null
                                                  )
                                                }
                                              />
                                            </div>
                                            <div className="flex flex-col space-y-4 my-4">
                                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                <label
                                                  htmlFor="school"
                                                  className="col-span-full font-medium"
                                                >
                                                  school
                                                </label>
                                                <input
                                                  type="text"
                                                  id="school"
                                                  name="school"
                                                  value={formEditData.school}
                                                  onChange={(e) =>
                                                    setFormEditData({
                                                      ...formEditData,
                                                      school: e.target.value,
                                                    })
                                                  }
                                                  className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                                  placeholder="Ex: Oxford University"
                                                  required
                                                />
                                              </div>
                                              <div className="flex items-center justify-between gap-3">
                                                {/* Input fields for city and country */}
                                                <div className="w-full">
                                                  <label
                                                    htmlFor="field_of_study"
                                                    className=" font-medium"
                                                  >
                                                    Field of study
                                                  </label>
                                                  <input
                                                    type="text"
                                                    id="field_of_study"
                                                    name="field_of_study"
                                                    value={
                                                      formEditData.field_of_study
                                                    }
                                                    onChange={(e) =>
                                                      setFormEditData({
                                                        ...formEditData,
                                                        field_of_study:
                                                          e.target.value,
                                                      })
                                                    }
                                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                                    placeholder="Ex. Computer Science"
                                                    required
                                                  />
                                                </div>
                                              </div>
                                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                {/* Input field for job title */}
                                                <label
                                                  htmlFor="degree"
                                                  className="col-span-full font-medium"
                                                >
                                                  degree
                                                </label>
                                                <input
                                                  type="text"
                                                  id="degree"
                                                  name="degree"
                                                  value={formEditData.degree}
                                                  onChange={(e) =>
                                                    setFormEditData({
                                                      ...formEditData,
                                                      degree: e.target.value,
                                                    })
                                                  }
                                                  className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                                  placeholder="Ex: Software Engineer"
                                                  required
                                                />
                                              </div>
                                              {/* From and To */}
                                              <div className="flex items-center justify-between gap-3">
                                                {/* Input fields for From month and year */}
                                                <div className="w-1/2">
                                                  <label
                                                    htmlFor="fromMonth"
                                                    className="font-medium"
                                                  >
                                                    From Month
                                                  </label>
                                                  <select
                                                    id="fromMonth"
                                                    name="fromMonth"
                                                    value={
                                                      formEditData.fromMonth
                                                    }
                                                    onChange={(e) =>
                                                      setFormEditData({
                                                        ...formEditData,
                                                        fromMonth:
                                                          e.target.value,
                                                      })
                                                    }
                                                    className="cursor-pointer px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full"
                                                    required
                                                  >
                                                    <option value="">
                                                      Select Month
                                                    </option>
                                                    <option value="1">
                                                      January
                                                    </option>
                                                    <option value="2">
                                                      February
                                                    </option>
                                                    <option value="3">
                                                      March
                                                    </option>
                                                    <option value="4">
                                                      April
                                                    </option>
                                                    <option value="5">
                                                      May
                                                    </option>
                                                    <option value="6">
                                                      June
                                                    </option>
                                                    <option value="7">
                                                      July
                                                    </option>
                                                    <option value="8">
                                                      August
                                                    </option>
                                                    <option value="9">
                                                      September
                                                    </option>
                                                    <option value="10">
                                                      October
                                                    </option>
                                                    <option value="11">
                                                      November
                                                    </option>
                                                    <option value="12">
                                                      December
                                                    </option>
                                                  </select>
                                                </div>
                                                <div className="w-1/2">
                                                  <label
                                                    htmlFor="fromYear"
                                                    className="font-medium"
                                                  >
                                                    From Year
                                                  </label>
                                                  <select
                                                    id="fromYear"
                                                    name="fromYear"
                                                    value={
                                                      formEditData.fromYear
                                                    }
                                                    onChange={(e) =>
                                                      setFormEditData({
                                                        ...formEditData,
                                                        fromYear:
                                                          e.target.value,
                                                      })
                                                    }
                                                    className="cursor-pointer px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full"
                                                    required
                                                  >
                                                    <option value="">
                                                      Select Year
                                                    </option>
                                                    {Array.from(
                                                      { length: 25 },
                                                      (_, i) => 2000 + i
                                                    ).map((year) => (
                                                      <option
                                                        key={year}
                                                        value={year}
                                                      >
                                                        {year}
                                                      </option>
                                                    ))}
                                                  </select>
                                                </div>
                                              </div>
                                              <div
                                                className={`flex items-center justify-between gap-3 ${
                                                  formEditData.current &&
                                                  "hidden"
                                                }`}
                                              >
                                                {/* Input fields for To month and year */}
                                                <div className="w-1/2">
                                                  <label
                                                    htmlFor="toMonth"
                                                    className="font-medium"
                                                  >
                                                    To Month
                                                  </label>
                                                  <select
                                                    id="toMonth"
                                                    name="toMonth"
                                                    value={formEditData.toMonth}
                                                    onChange={(e) =>
                                                      setFormEditData({
                                                        ...formEditData,
                                                        toMonth: e.target.value,
                                                      })
                                                    }
                                                    className="cursor-pointer px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full"
                                                  >
                                                    <option value="">
                                                      Select Month
                                                    </option>
                                                    <option value="1">
                                                      January
                                                    </option>
                                                    <option value="2">
                                                      February
                                                    </option>
                                                    <option value="3">
                                                      March
                                                    </option>
                                                    <option value="4">
                                                      April
                                                    </option>
                                                    <option value="5">
                                                      May
                                                    </option>
                                                    <option value="6">
                                                      June
                                                    </option>
                                                    <option value="7">
                                                      July
                                                    </option>
                                                    <option value="8">
                                                      August
                                                    </option>
                                                    <option value="9">
                                                      September
                                                    </option>
                                                    <option value="10">
                                                      October
                                                    </option>
                                                    <option value="11">
                                                      November
                                                    </option>
                                                    <option value="12">
                                                      December
                                                    </option>
                                                  </select>
                                                </div>
                                                <div className="w-1/2">
                                                  <label
                                                    htmlFor="toYear"
                                                    className="font-medium"
                                                  >
                                                    To Year
                                                  </label>
                                                  <select
                                                    id="toYear"
                                                    name="toYear"
                                                    value={formEditData.toYear}
                                                    onChange={(e) =>
                                                      setFormEditData({
                                                        ...formEditData,
                                                        toYear: e.target.value,
                                                      })
                                                    }
                                                    className="cursor-pointer px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full"
                                                  >
                                                    <option value="">
                                                      Select Year
                                                    </option>
                                                    {Array.from(
                                                      { length: 25 },
                                                      (_, i) => 2000 + i
                                                    ).map((year) => (
                                                      <option
                                                        key={year}
                                                        value={year}
                                                      >
                                                        {year}
                                                      </option>
                                                    ))}
                                                  </select>
                                                </div>
                                              </div>
                                              {/* Checkbox and Description */}
                                              <div className="flex items-center">
                                                <div className="inline-flex items-center">
                                                  <label
                                                    className="relative flex cursor-pointer items-center rounded-full p-2"
                                                    htmlFor="checkbox-1"
                                                    data-ripple-dark="true"
                                                  >
                                                    <input
                                                      type="checkbox"
                                                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute checked:border-primary checked:bg-primary"
                                                      id="checkbox-1"
                                                      checked={
                                                        formEditData.current
                                                      }
                                                      onChange={() =>
                                                        setFormEditData({
                                                          ...formEditData,
                                                          current:
                                                            !formEditData.current,
                                                        })
                                                      }
                                                    />
                                                    <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                                      <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-3.5 w-3.5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        stroke="currentColor"
                                                        strokeWidth={1}
                                                      >
                                                        <path
                                                          fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"
                                                        />
                                                      </svg>
                                                    </div>
                                                  </label>
                                                </div>
                                                <p className="text-lg text-secondary">
                                                  I currently study here
                                                </p>
                                              </div>
                                              <div>
                                                {/* Input field for description */}
                                                <h3 className="font-medium">
                                                  Description (Optional)
                                                </h3>
                                                <div className="mt-2">
                                                  <textarea
                                                    id="description"
                                                    rows={3}
                                                    value={
                                                      formEditData.description
                                                    }
                                                    onChange={(e) =>
                                                      setFormEditData({
                                                        ...formEditData,
                                                        description:
                                                          e.target.value,
                                                      })
                                                    }
                                                    className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                                                    placeholder="Enter description"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {dateEditError && (
                                            <p className="text-red-500">
                                              Ending date cannot be earlier than
                                              starting date.
                                            </p>
                                          )}
                                          <div className="flex items-center justify-between space-x-2 pt-3 border-t">
                                            <button
                                              type="button"
                                              className="px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none w-full"
                                              onClick={() =>
                                                setShowEditExperienceModal(null)
                                              }
                                            >
                                              Cancel
                                            </button>
                                            {ediExperienceLoading ? (
                                              <button
                                                type="button"
                                                className={`px-4 py-4 font-medium text-white bg-primary bg-opacity-80 border border-transparent rounded-md shadow-sm hover:bg-opacity-90 transition-all focus:outline-none w-full cursor-context-menu  `}
                                              >
                                                <div className="loaderProfile mx-auto"></div>
                                              </button>
                                            ) : (
                                              <button
                                                type="button"
                                                className={`px-4 py-3 font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-opacity-90 transition-all focus:outline-none w-full ${
                                                  isEditEnabled
                                                    ? ""
                                                    : "opacity-50 cursor-not-allowed"
                                                }`}
                                                onClick={handleEditExperience}
                                                disabled={!isEditEnabled}
                                              >
                                                Save
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      </Modal>
                                    )}
                                  </AnimatePresence>
                                </div>
                                <div className="rounded-full p-[3px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all">
                                  <MdDelete
                                    className="text-primary text-lg"
                                    onClick={() =>
                                      setShowDeleteExperienceModal(item?._id)
                                    }
                                  />

                                  <AnimatePresence
                                    initial={false}
                                    onExitComplete={() => null}
                                  >
                                    {showDeleteExperienceModal && (
                                      <DeleteConfirmationModal
                                        title="Education"
                                        onClose={() =>
                                          setShowDeleteExperienceModal(null)
                                        }
                                        onConfirm={() =>
                                          handleDeleteExperience()
                                        }
                                      />
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                            </div>
                            <p className="  text-lg text-secondary">
                              {item?.degree}
                            </p>
                            <p className="  text-lg text-secondary">
                              {" "}
                              {format(
                                new Date(item?.from),
                                "MMMM, yyyy"
                              )} -{" "}
                              {item?.current
                                ? "Present"
                                : format(new Date(item?.to), "MMMM, yyyy")}
                            </p>
                          </div>
                        )
                      )
                    ) : (
                      <p className=" text-secondary my-2">No data found</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold mb-6">
                      {userProfile?.sub_title
                        ? userProfile?.sub_title
                        : "No title added."}
                    </p>
                    <div className="rounded-full p-[6px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all">
                      <MdEdit
                        className="text-primary text-lg"
                        onClick={() => {
                          setShowEditInfoModal(userProfile?.user?._id);
                          setInfoEditData({
                            sub_title: userProfile?.sub_title,
                            description: userProfile?.description,
                          });
                        }}
                      />
                      <AnimatePresence
                        initial={false}
                        onExitComplete={() => null}
                      >
                        {showEditInfoModal && (
                          <Modal>
                            <div className="p-8 rounded-2xl bg-white min-w-[480px] max-w-lg relative">
                              <div className="flex flex-col max-h-[80vh] p-1 overflow-y-auto">
                                <div
                                  className="flex items-center justify-between"
                                  onClick={() => setShowEditInfoModal(null)}
                                >
                                  <p className="text-3xl font-semibold">
                                    Edit your info
                                  </p>
                                  <RxCross1 className="text-2xl cursor-pointer" />
                                </div>
                                <div className="flex flex-col space-y-4 my-4">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    <label
                                      htmlFor="name"
                                      className="col-span-full font-medium"
                                    >
                                      Title
                                    </label>
                                    <input
                                      type="text"
                                      id="name"
                                      name="name"
                                      value={infoEditData.sub_title}
                                      onChange={(e) =>
                                        setInfoEditData({
                                          ...infoEditData,
                                          sub_title: e.target.value,
                                        })
                                      }
                                      className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                      placeholder="Ex: Web developer"
                                      required
                                    />
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="name"
                                      className="col-span-full font-medium "
                                    >
                                      Description
                                    </label>
                                    <textarea
                                      id="description"
                                      rows={3}
                                      value={infoEditData.description}
                                      onChange={(e) =>
                                        setInfoEditData({
                                          ...infoEditData,
                                          description: e.target.value,
                                        })
                                      }
                                      className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary mt-2"
                                      placeholder="Enter description"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between space-x-2 pt-3 border-t">
                                <button
                                  type="button"
                                  className="px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none w-full"
                                  onClick={() => setShowEditInfoModal(null)}
                                >
                                  Cancel
                                </button>
                                {editInfoLoading ? (
                                  <button
                                    type="button"
                                    className={`px-4 py-4 font-medium text-white bg-primary bg-opacity-80 border border-transparent rounded-md shadow-sm hover:bg-opacity-90 transition-all focus:outline-none w-full cursor-context-menu  `}
                                  >
                                    <div className="loaderProfile mx-auto"></div>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className={`px-4 py-3 font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-opacity-90 transition-all focus:outline-none w-full ${
                                      isInfoEditEnabled
                                        ? ""
                                        : "opacity-50 cursor-not-allowed"
                                    }`}
                                    onClick={handleEditInfo}
                                    disabled={!isInfoEditEnabled}
                                  >
                                    Save
                                  </button>
                                )}
                              </div>
                            </div>
                          </Modal>
                        )}
                      </AnimatePresence>
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
                <div className="p-6 border-b">
                  <p className="text-2xl font-semibold mb-4">
                    Work History ({userProfile?.completed_projects})
                  </p>
                  {userProfile?.reviews?.length > 0 ? (
                    userProfile?.reviews
                      .slice(0, displayedRemainingReviews)
                      .map(
                        (
                          item: {
                            offer: any;
                            rating: any;
                            amount: any;
                            duration: any;
                            _id: string | null;
                            title: string | undefined;
                            to: any;
                            description: string | undefined;
                          },
                          index: number
                        ) => (
                          <div
                            className={`p-3 cursor-pointer transition-all group hover:bg-gray-100 ${
                              index < displayedRemainingReviews - 1 ||
                              (userProfile?.reviews?.length - 1 !== index &&
                                "border-b")
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
                                <span className="font-medium">
                                  {item?.duration}
                                </span>
                              </p>
                            </div>
                            <p className="text-secondary ">
                              &apos;{item?.description}&apos;
                            </p>
                            <p className="text-md pt-3 text-secondary">
                              Project budget :{" "}
                              <span className="font-medium">
                                ${item?.amount}
                              </span>
                            </p>
                          </div>
                        )
                      )
                  ) : (
                    <p className="text-secondary my-2">No data found.</p>
                  )}

                  <div className={`flex items-center justify-center gap-x-2 `}>
                    {userProfile?.reviews?.length >
                      displayedRemainingReviews && (
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
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold mb-4">
                      Portfolio ({userProfile?.projects?.length})
                    </p>
                    <div className="rounded-full p-[3px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all">
                      <FiPlus
                        className="text-primary text-lg"
                        onClick={() => setShowAddProjectModal(true)}
                      />
                      <AnimatePresence
                        initial={false}
                        onExitComplete={() => null}
                      >
                        {showAddProjectModal && (
                          <Modal>
                            <div className="p-8 rounded-2xl bg-white min-w-[480px] max-w-lg relative">
                              <div className="flex flex-col max-h-[80vh] p-1 overflow-y-auto">
                                <div
                                  className="flex items-center justify-between"
                                  onClick={() => setShowAddProjectModal(false)}
                                >
                                  <p className="text-3xl font-semibold">
                                    Add a project
                                  </p>
                                  <RxCross1 className="text-2xl cursor-pointer" />
                                </div>
                                <div className="flex flex-col space-y-4 my-4">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    <label
                                      htmlFor="name"
                                      className="col-span-full font-medium"
                                    >
                                      Title
                                    </label>
                                    <input
                                      type="text"
                                      id="name"
                                      name="name"
                                      value={projectData.title}
                                      onChange={(e) =>
                                        setProjectData({
                                          ...projectData,
                                          title: e.target.value,
                                        })
                                      }
                                      className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                      placeholder="Ex: Web developer"
                                      required
                                    />
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    <label
                                      htmlFor="link"
                                      className="col-span-full font-medium"
                                    >
                                      Link
                                    </label>
                                    <input
                                      type="url"
                                      id="link"
                                      name="link"
                                      value={projectData.link}
                                      onChange={(e) =>
                                        setProjectData({
                                          ...projectData,
                                          link: e.target.value,
                                        })
                                      }
                                      className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                      required
                                      placeholder="Paste your project link here"
                                    />
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    <label
                                      htmlFor="file"
                                      className="col-span-full font-medium"
                                    >
                                      Image
                                      {projectData?.image !== "" && (
                                        <Image
                                          src={projectData?.image}
                                          width={300}
                                          height={400}
                                          alt="picture"
                                          className="rounded-xl"
                                          style={{ objectFit: "cover" }} // Ensure the image covers the specified dimensions
                                        />
                                      )}
                                    </label>
                                    <input
                                      type="file"
                                      id="file"
                                      name="file"
                                      accept="image/*"
                                      onChange={handleFileChange}
                                      className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                      required
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between space-x-2 pt-3 border-t">
                                <button
                                  type="button"
                                  className="px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none w-full"
                                  onClick={() => setShowAddProjectModal(false)}
                                >
                                  Cancel
                                </button>
                                {addProjectLoading || imageLoading ? (
                                  <button
                                    type="button"
                                    className={`px-4 py-4 font-medium text-white bg-primary bg-opacity-80 border border-transparent rounded-md shadow-sm hover:bg-opacity-90 transition-all focus:outline-none w-full cursor-context-menu  `}
                                  >
                                    <div className="loaderProfile mx-auto"></div>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className={`px-4 py-3 font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-opacity-90 transition-all focus:outline-none w-full ${
                                      isProjectSaveEnabled
                                        ? ""
                                        : "opacity-50 cursor-not-allowed"
                                    }`}
                                    onClick={handleSaveProject}
                                    disabled={!isProjectSaveEnabled}
                                  >
                                    Save
                                  </button>
                                )}
                              </div>
                            </div>
                          </Modal>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {userProfile?.projects?.length > 0 ? (
                      userProfile?.projects
                        .slice(0, displayedRemainingProjects)
                        .map(
                          (
                            item: {
                              _id: any;
                              link: string; // Assuming link is of type string
                              image: string | undefined;
                              title:
                                | string
                                | number
                                | boolean
                                | React.ReactElement<
                                    any,
                                    string | React.JSXElementConstructor<any>
                                  >
                                | Iterable<React.ReactNode>
                                | React.ReactPortal
                                | Promise<React.AwaitedReactNode>
                                | null
                                | undefined;
                            },
                            index: React.Key | null | undefined
                          ) => (
                            <div
                              className="group cursor-pointer"
                              key={index}
                              onClick={() =>
                                item?.link && window.open(item.link, "_blank")
                              } // Open link in new tab
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
                                <div className="flex items-center gap-x-1">
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
                                    <AnimatePresence
                                      initial={false}
                                      onExitComplete={() => null}
                                    >
                                      {showEditProjectModal && (
                                        <Modal>
                                          <div className="p-8 rounded-2xl bg-white min-w-[480px] max-w-lg relative">
                                            <div className="flex flex-col max-h-[80vh] p-1 overflow-y-auto">
                                              <div
                                                className="flex items-center justify-between"
                                                onClick={() =>
                                                  setShowEditProjectModal(null)
                                                }
                                              >
                                                <p className="text-3xl font-semibold">
                                                  Edit project
                                                </p>
                                                <RxCross1 className="text-2xl cursor-pointer" />
                                              </div>
                                              <div className="flex flex-col space-y-4 my-4">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                  <label
                                                    htmlFor="name"
                                                    className="col-span-full font-medium"
                                                  >
                                                    Title
                                                  </label>
                                                  <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={
                                                      projectEditData.title
                                                    }
                                                    onChange={(e) =>
                                                      setProjectEditData({
                                                        ...projectEditData,
                                                        title: e.target.value,
                                                      })
                                                    }
                                                    className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                                    placeholder="Ex: Web developer"
                                                    required
                                                  />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                  <label
                                                    htmlFor="link"
                                                    className="col-span-full font-medium"
                                                  >
                                                    Link
                                                  </label>
                                                  <input
                                                    type="url"
                                                    id="link"
                                                    name="link"
                                                    value={projectEditData.link}
                                                    onChange={(e) =>
                                                      setProjectEditData({
                                                        ...projectEditData,
                                                        link: e.target.value,
                                                      })
                                                    }
                                                    className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                                    required
                                                    placeholder="Paste your project link here"
                                                  />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                  <label
                                                    htmlFor="file"
                                                    className="col-span-full font-medium"
                                                  >
                                                    Image
                                                    <Image
                                                      src={
                                                        projectEditData?.image
                                                      }
                                                      width={300}
                                                      height={400}
                                                      alt="picture"
                                                      className="rounded-xl"
                                                      style={{
                                                        objectFit: "cover",
                                                      }} // Ensure the image covers the specified dimensions
                                                    />
                                                  </label>
                                                  <input
                                                    type="file"
                                                    id="file"
                                                    name="file"
                                                    accept="image/*"
                                                    onChange={
                                                      handleEditFileChange
                                                    }
                                                    className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                                    required
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div className="flex items-center justify-between space-x-2 pt-3 border-t">
                                              <button
                                                type="button"
                                                className="px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none w-full"
                                                onClick={() =>
                                                  setShowEditProjectModal(null)
                                                }
                                              >
                                                Cancel
                                              </button>
                                              {addProjectLoading ||
                                              imageEditLoading ? (
                                                <button
                                                  type="button"
                                                  className={`px-4 py-4 font-medium text-white bg-primary bg-opacity-80 border border-transparent rounded-md shadow-sm hover:bg-opacity-90 transition-all focus:outline-none w-full cursor-context-menu  `}
                                                >
                                                  <div className="loaderProfile mx-auto"></div>
                                                </button>
                                              ) : (
                                                <button
                                                  type="button"
                                                  className={`px-4 py-3 font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-opacity-90 transition-all focus:outline-none w-full ${
                                                    isProjectEditEnabled
                                                      ? ""
                                                      : "opacity-50 cursor-not-allowed"
                                                  }`}
                                                  onClick={handleEditProject}
                                                  disabled={
                                                    !isProjectEditEnabled
                                                  }
                                                >
                                                  Save
                                                </button>
                                              )}
                                            </div>
                                          </div>
                                        </Modal>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                  <div
                                    className="rounded-full p-[3px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all  flex items-center justify-center"
                                    onClick={(e) => {
                                      setShowDeleteProjectModal(item?._id);
                                      e.stopPropagation();
                                    }}
                                  >
                                    <MdDelete className="text-primary text-lg" />
                                    <AnimatePresence
                                      initial={false}
                                      onExitComplete={() => null}
                                    >
                                      {showDeleteProjectModal && (
                                        <DeleteConfirmationModal
                                          title="Project"
                                          onClose={() =>
                                            setShowDeleteProjectModal(null)
                                          }
                                          onConfirm={() =>
                                            handleDeleteProject()
                                          }
                                        />
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )
                    ) : (
                      <p className="text-secondary my-2">No data found</p>
                    )}
                  </div>
                  <div className={`flex items-center justify-center gap-x-2 `}>
                    {userProfile?.projects?.length >
                      displayedRemainingProjects && (
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

                <div className="p-6">
                  <p className="text-2xl font-semibold mb-4">Skills</p>
                  <div className="flex items-center flex-wrap gap-2">
                    {userProfile?.skills?.length > 0 ? (
                      userProfile?.skills.map(
                        (
                          item: {
                            name:
                              | string
                              | number
                              | boolean
                              | React.ReactElement<
                                  any,
                                  string | React.JSXElementConstructor<any>
                                >
                              | Iterable<React.ReactNode>
                              | React.ReactPortal
                              | Promise<React.AwaitedReactNode>
                              | null
                              | undefined;
                          },
                          index: React.Key | null | undefined
                        ) => (
                          <button
                            className="rounded-3xl px-3 py-1 bg-primary bg-opacity-[0.18] text-secondary text-center active:scale-95 "
                            key={index}
                          >
                            {item?.name}{" "}
                          </button>
                        )
                      )
                    ) : (
                      <p className="text-secondary my-2">No data found</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MyExperiences />
        </>
      )}

      <Footer />
    </div>
  );
}
