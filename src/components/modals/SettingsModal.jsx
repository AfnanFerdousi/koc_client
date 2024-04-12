import React, { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  addSettings,
  editInfo,
  editSettings,
  getProfile,
} from "../../axios/axios";
import { setLoading } from "@/redux/reducers/loadingSlice";
import { useForm } from "react-hook-form";

const SettingsModal = ({
  setShowSettingsModal,
  showAddSettingsModal,
  userProfile,
}) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {}, // Set default values from initialData if available
  });
  const loading = useSelector((state) => state.loading.loading);

  const onSubmit = (data) => {
    dispatch(setLoading(true));
    dispatch(
      editInfo({
        dynamicParams: { userId: userProfile?.user?._id },
        bodyData: data,
      })
    )
      .then(() => dispatch(getProfile()))
      .then(() => {
        dispatch(setLoading(false));
        setShowAddSettingsModal(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    if (!showAddSettingsModal) {
      reset(); // Reset form when modal is closed
    }
  }, [showAddSettingsModal]);

  return (
    <Modal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 rounded-2xl bg-white min-w-[480px] max-w-lg "
      >
        <div className="flex flex-col max-h-[80vh] p-1 overflow-y-auto">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-semibold">Edit your settings</p>
            <RxCross1
              className="text-2xl cursor-pointer"
              onClick={() => setShowAddSettingsModal(!isEdit ? false : null)}
            />
          </div>
          <div className="flex flex-col space-y-2 my-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
              <label htmlFor="name" className="col-span-full font-medium">
                Settings Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                {...register("name", { required: true })}
                className="col-span-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ex: English"
              />
            </div>
            {errors.name && (
              <span className="w-full text-red-500 -mt-1 cursor-context-menu">
                This field is required
              </span>
            )}
            <div className="">
              <label
                htmlFor="efficiency"
                className="col-span-full font-medium "
              >
                Efficiency
              </label>
              <select
                id="efficiency"
                name="efficiency"
                {...register("efficiency", { required: true })}
                className="cursor-pointer px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary w-full "
              >
                <option value="">Select Efficiency</option>
                <option value="Basic">Basic</option>
                <option value="Conversational">Conversational</option>
                <option value="Fluent">Fluent</option>
                <option value="Native">Native</option>
              </select>
            </div>
            {errors.efficiency && (
              <span className="w-full text-red-500  -mt-1 cursor-context-menu">
                This field is required
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between space-x-2 pt-3 border-t">
          <button
            type="button"
            className="px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none w-full"
            onClick={() => setShowAddSettingsModal(!isEdit ? false : null)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4  font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-opacity-90 transition-all focus:outline-none w-full ${
              loading || errors.name || errors.efficiency
                ? "cursor-not-allowed py-[18px] opacity-50"
                : "py-3"
            }`}
            disabled={loading || errors.name || errors.efficiency}
          >
            {loading ? <div className="loaderProfile mx-auto "></div> : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
