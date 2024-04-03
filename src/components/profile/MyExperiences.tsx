/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { RxCross1 } from "react-icons/rx";
import { format } from "date-fns";
import { FiPlus } from "react-icons/fi";
import Modal from "@/components/ui/Modal";
import { AnimatePresence } from "framer-motion";
import {
  addExperience,
  deleteExperience,
  editExperience,
  getProfile,
} from "@/axios/axios";
import { setLoading } from "@/redux/reducers/experienceSlice";
import { MdDelete, MdEdit, MdOutlineEdit } from "react-icons/md";
import DeleteConfirmationModal from "../ui/DeleteModal";

const myExperiences = () => {
  const dispatch: any = useDispatch();

  // Selecting necessary data from Redux store
  const userProfile: any = useSelector((state: RootState) => state.auth?.data);
  const addExperienceLoading: boolean = useSelector(
    (state: RootState) => state.experience?.loading
  );

  // State variables
  const [showAddExperienceModal, setShowAddExperienceModal] = useState(false);
  const [showEditExperienceModal, setShowEditExperienceModal] = useState<
    any | null
  >(null);
  const [showDeleteExperienceModal, setShowDeleteExperienceModal] = useState<
    string | null
  >(null);
  const [formData, setFormData] = useState<any>({
    company: "",
    city: "",
    country: "",
    title: "",
    from: null,
    to: null,
    current: true,
    description: "",
  });
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [dateError, setDateError] = useState(false);
  // Function to check form validity
  const checkFormValidity = () => {
    const { company, city, country, title, from, current, to } = formData;
    setIsSaveEnabled(
      company && city && country && title && from && (current || to)
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

      dispatch(setLoading(true));
      dispatch(
        addExperience({
          userId: userProfile?.user?._id,
          experienceData: formattedFormData,
        })
      )
        .then(() => {
          // After adding experience, fetch the updated profile data
          return dispatch(getProfile());
        })
        .then(() => {
          // Once profile is fetched, reset loading state and close modal
          dispatch(setLoading(false));
          setShowAddExperienceModal(false);
        })
        .catch((error: any) => {
          console.error("Error:", error);
          dispatch(setLoading(false));
        });
    } else {
      console.error("Incomplete form fields");
    }
  };

  useEffect(() => {
    // Reset form data when the modal is closed
    if (!showAddExperienceModal) {
      setFormData({
        company: "",
        city: "",
        country: "",
        title: "",
        from: null,
        to: null,
        current: false,
        description: "",
      });
    }
  }, [showAddExperienceModal]);

  const handleDeleteExperience = () => {
    dispatch(setLoading(true));
    dispatch(
      deleteExperience({
        userId: userProfile?.user?._id,
        experienceId: showDeleteExperienceModal,
      })
    )
      .then(() => {
        // After adding experience, fetch the updated profile data
        return dispatch(getProfile());
      })
      .then(() => {
        // Once profile is fetched, reset loading state and close modal
        dispatch(setLoading(false));
        setShowDeleteExperienceModal(null);
      })
      .catch((error: any) => {
        console.error("Error:", error);
        dispatch(setLoading(false));
      });
  };

  // ----------------- edit ----------------

  const [formEditData, setFormEditData] = useState<any>({
    company: "",
    city: "",
    country: "",
    title: "",
    from: null,
    to: null,
    current: false,
    description: "",
  });
  const [isEditSaveEnabled, setIsEditSaveEnabled] = useState(false);
  const [editDateError, setEditDateError] = useState(false);
  // Function to check form validity
  const checkEditFormValidity = () => {
    const { from, current, to } = formEditData;
    setIsEditSaveEnabled(from && (current || to));
  };

  useEffect(() => {
    // Update 'from' property when 'fromMonth' or 'fromYear' changes
    const { fromMonth, fromYear } = formEditData;
    if (fromMonth && fromYear) {
      const from = new Date(`${fromYear}-${fromMonth}-01`);
      setFormEditData((prev: any) => ({ ...prev, from }));
    }
    setDateError(false);
  }, [formEditData.fromMonth, formEditData.fromYear]);

  useEffect(() => {
    // Update 'to' property when 'toMonth' or 'toYear' changes
    const { toMonth, toYear } = formEditData;
    if (toMonth && toYear) {
      const to = new Date(`${toYear}-${toMonth}-01`);
      setFormEditData((prev: any) => ({ ...prev, to }));
    }
    setDateError(false);
  }, [formEditData.toMonth, formEditData.toYear]);

  useEffect(() => {
    // Call checkFormValidity whenever formEditData changes
    checkEditFormValidity();
  }, [formEditData]);

  // Function to handle saving experience Editdata
  const handleEditExperience = () => {
    if (isEditSaveEnabled) {
      const { from, to, current } = formEditData;
      const fromDate = new Date(from);
      const toDate = new Date(to);

      if (fromDate > toDate && !current) {
        setEditDateError(true);
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

      dispatch(setLoading(true));
      dispatch(
        editExperience({
          userId: userProfile?.user?._id,
          experienceId: showEditExperienceModal,
          experienceData: formattedFormEditData,
        })
      )
        .then(() => {
          // After adding experience, fetch the updated profile Editdata
          return dispatch(getProfile());
        })
        .then(() => {
          // Once profile is fetched, reset loading state and close modal
          dispatch(setLoading(false));
          setShowEditExperienceModal(false);
        })
        .catch((error: any) => {
          console.error("Error:", error);
          dispatch(setLoading(false));
        });
    } else {
      console.error("Incomplete form fields");
    }
  };

  useEffect(() => {
    // Reset form Editdata when the modal is closed
    if (!showEditExperienceModal) {
      setFormEditData({
        company: "",
        city: "",
        country: "",
        title: "",
        from: null,
        to: null,
        current: false,
        description: "",
      });
    }
  }, [showAddExperienceModal]);

  return (
    <div className="border rounded-3xl max-w-screen-xl p-6 mt-8 mb-28 mx-auto">
      <div className="flex items-center justify-between">
        <p className="text-3xl font-semibold mb-4">Employment History</p>

        <div className="rounded-full p-[6px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all">
          <FiPlus
            className="text-primary text-lg"
            onClick={() => setShowAddExperienceModal(true)}
          />
        </div>
        <AnimatePresence initial={false} onExitComplete={() => null}>
          {showAddExperienceModal && (
            <Modal>
              <div className="p-8 rounded-2xl bg-white min-w-[768px] max-w-lg relative">
                <div className="flex flex-col max-h-[80vh] p-1 overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-semibold">Add employment</p>
                    <RxCross1
                      className="text-2xl cursor-pointer"
                      onClick={() => setShowAddExperienceModal(false)}
                    />
                  </div>
                  <div className="flex flex-col space-y-4 my-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <label
                        htmlFor="company"
                        className="col-span-full font-medium"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company: e.target.value,
                          })
                        }
                        className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Ex: Upwork"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      {/* Input fields for city and country */}
                      <div className="w-1/2">
                        <label htmlFor="city" className=" font-medium">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              city: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="Enter city"
                          required
                        />
                      </div>
                      <div className="w-1/2">
                        <label htmlFor="country" className=" font-medium">
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              country: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="Ex: United States"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {/* Input field for job title */}
                      <label
                        htmlFor="title"
                        className="col-span-full font-medium"
                      >
                        Title
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
                          })
                        }
                        className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Ex: Senior Software Engineer"
                        required
                      />
                    </div>
                    {/* From and To */}
                    <div className="flex items-center justify-between gap-3">
                      {/* Input fields for From month and year */}
                      <div className="w-1/2">
                        <label htmlFor="fromMonth" className="font-medium">
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
                        <label htmlFor="fromYear" className="font-medium">
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
                          {Array.from({ length: 25 }, (_, i) => 2000 + i).map(
                            (year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            )
                          )}
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
                        <label htmlFor="toMonth" className="font-medium">
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
                        <label htmlFor="toYear" className="font-medium">
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
                          {Array.from({ length: 25 }, (_, i) => 2000 + i).map(
                            (year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            )
                          )}
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
                        I currently work here
                      </p>
                    </div>
                    <div>
                      {/* Input field for description */}
                      <h3 className="font-medium">Description (Optional)</h3>
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
                    Ending date cannot be earlier than starting date.
                  </p>
                )}
                <div className="flex items-center justify-between space-x-2 pt-3 border-t">
                  <button
                    type="button"
                    className="px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none w-full"
                    onClick={() => setShowAddExperienceModal(false)}
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
                        isSaveEnabled ? "" : "opacity-50 cursor-not-allowed"
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
      {userProfile?.experience?.length > 0 ? (
        userProfile?.experience?.map(
          (
            item: {
              toYear: string | number | readonly string[] | undefined;
              fromYear: string | number | readonly string[] | undefined;
              toMonth: string | number | readonly string[] | undefined;
              city: string | number | readonly string[] | undefined;
              country: string | number | readonly string[] | undefined;
              fromMonth: string | number | readonly string[] | undefined;
              _id: string | null;
              title: string | undefined;
              company: string | undefined;
              from: string;
              current: any;
              to: any;
              description: string | undefined;
            },
            index: React.Key | null | undefined
          ) => (
            <div
              className={`my-2 py-6 ${
                userProfile?.experience?.length - 1 !== index && "border-b"
              }`}
              key={index}
            >
              <div className="flex items-center justify-between">
                <p className="text-2xl font-semibold mb-2">
                  {item?.title} | {item?.company}
                </p>
                <div className="flex items-center gap-x-2">
                  <div className="rounded-full p-[6px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all">
                    <MdEdit
                      className="text-primary text-lg"
                      onClick={() => {
                        setShowEditExperienceModal(item?._id);
                        setFormEditData({
                          company: item?.company,
                          city: item?.city,
                          country: item?.country,
                          title: item?.title,
                          current: item?.current,
                          description: item?.description,
                        });
                        console.log("siiiisdfa", item);
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
                                  Edit employment
                                </p>
                                <RxCross1
                                  className="text-2xl cursor-pointer"
                                  onClick={() =>
                                    setShowEditExperienceModal(null)
                                  }
                                />
                              </div>
                              <div className="flex flex-col space-y-4 my-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                  <label
                                    htmlFor="company"
                                    className="col-span-full font-medium"
                                  >
                                    Company
                                  </label>
                                  <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formEditData.company}
                                    onChange={(e) =>
                                      setFormEditData({
                                        ...formEditData,
                                        company: e.target.value,
                                      })
                                    }
                                    className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="Ex: Upwork"
                                    required
                                  />
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                  {/* Input fields for city and country */}
                                  <div className="w-1/2">
                                    <label
                                      htmlFor="city"
                                      className=" font-medium"
                                    >
                                      City
                                    </label>
                                    <input
                                      type="text"
                                      id="city"
                                      name="city"
                                      value={formEditData.city}
                                      onChange={(e) =>
                                        setFormEditData({
                                          ...formEditData,
                                          city: e.target.value,
                                        })
                                      }
                                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                      placeholder="Enter city"
                                      required
                                    />
                                  </div>
                                  <div className="w-1/2">
                                    <label
                                      htmlFor="country"
                                      className=" font-medium"
                                    >
                                      Country
                                    </label>
                                    <input
                                      type="text"
                                      id="country"
                                      name="country"
                                      value={formEditData.country}
                                      onChange={(e) =>
                                        setFormEditData({
                                          ...formEditData,
                                          country: e.target.value,
                                        })
                                      }
                                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                      placeholder="Ex: United States"
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                  {/* Input field for job title */}
                                  <label
                                    htmlFor="title"
                                    className="col-span-full font-medium"
                                  >
                                    Title
                                  </label>
                                  <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formEditData.title}
                                    onChange={(e) =>
                                      setFormEditData({
                                        ...formEditData,
                                        title: e.target.value,
                                      })
                                    }
                                    className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="Ex: Senior Software Engineer"
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
                                      value={formEditData.fromMonth}
                                      onChange={(e) =>
                                        setFormEditData({
                                          ...formEditData,
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
                                      value={formEditData.fromYear}
                                      onChange={(e) =>
                                        setFormEditData({
                                          ...formEditData,
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
                                    formEditData.current && "hidden"
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
                                      value={formEditData.toYear}
                                      onChange={(e) =>
                                        setFormEditData({
                                          ...formEditData,
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
                                      Editdata-ripple-dark="true"
                                    >
                                      <input
                                        type="checkbox"
                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-primary transition-all before:absolute checked:border-primary checked:bg-primary"
                                        id="checkbox-1"
                                        checked={formEditData.current}
                                        onChange={() =>
                                          setFormEditData({
                                            ...formEditData,
                                            current: !formEditData.current,
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
                                    I currently work here
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
                                      value={formEditData.description}
                                      onChange={(e) =>
                                        setFormEditData({
                                          ...formEditData,
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
                            {editDateError && (
                              <p className="text-red-500">
                                Ending date cannot be earlier than starting
                                date.
                              </p>
                            )}
                            <div className="flex items-center justify-between space-x-2 pt-3 border-t">
                              <button
                                type="button"
                                className="px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none w-full"
                                onClick={() => setShowEditExperienceModal(null)}
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
                                    isEditSaveEnabled
                                      ? ""
                                      : "opacity-50 cursor-not-allowed"
                                  }`}
                                  onClick={handleEditExperience}
                                  disabled={!isEditSaveEnabled}
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
                  <div className="rounded-full p-[6px] border-[1px] border-primary hover:bg-gray-50 cursor-pointer transition-all">
                    <MdDelete
                      className="text-primary text-lg"
                      onClick={() => setShowDeleteExperienceModal(item?._id)}
                    />
                    <AnimatePresence
                      initial={false}
                      onExitComplete={() => null}
                    >
                      {showDeleteExperienceModal && (
                        <DeleteConfirmationModal
                          title="Experience"
                          onClose={() => setShowDeleteExperienceModal(null)}
                          onConfirm={() => handleDeleteExperience()}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <p className=" font-medium text-lg text-secondary mb-2">
                {" "}
                {format(new Date(item?.from), "MMMM, yyyy")} -{" "}
                {item?.current
                  ? "Present"
                  : format(new Date(item?.to), "MMMM, yyyy")}
              </p>
              <p className="text-lg text-secondary">{item?.description}</p>
            </div>
          )
        )
      ) : (
        <p className=" text-secondary my-2">No data found. </p>
      )}
    </div>
  );
};

export default myExperiences;
