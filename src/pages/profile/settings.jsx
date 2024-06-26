import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { MdEdit } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import AddSettingsModal from "../../components/modals/SettingsModal";
import { getCountries } from "../../axios/axios";
import { setLoading } from "@/redux/reducers/loadingSlice";
import ProtectedRoute from "../../components/layouts/ProtectedRoute";

export default function Profile() {
  // Selecting necessary data from Redux store
  const userProfile = useSelector((state) => state.user?.data);
  const isLoading = useSelector((state) => state.user?.loading);
  const loading = useSelector((state) => state.loading?.loading);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  // Log profile data for debugging
  useEffect(() => {
    console.log("profile", userProfile);
  }, [userProfile]);
  const accountData = [
    { name: "User Id", value: userProfile?.user?._id },
    { name: "First Name", value: userProfile?.user?.first_name },
    { name: "Last Name", value: userProfile?.user?.lastName },
    { name: "Email Address", value: userProfile?.user?.email },
    { name: "Phone Number", value: userProfile?.user?.phone_number },
    { name: "Category", value: userProfile?.category?.name },
    { name: "City", value: userProfile?.city },
    { name: "Country", value: userProfile?.country },
    { name: "Timezone", value: userProfile?.timezone },
  ];

  // for sending all cities of the country
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        // Fetch countries data
        const countriesResponse = await dispatch(getCountries());
        setCities(
          countriesResponse?.payload?.data
            ?.map((item) => ({
              value: item.name,
              cities: item.cities,
            }))
            .find((item) => item.value === userProfile?.country).cities
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      dispatch(setLoading(false));
    };

    fetchData();
  }, [dispatch, userProfile?.country]);
  return (
    <ProtectedRoute>
      <Head>
        <title> Profile Settings | KocFreelancing</title>
      </Head>
      <Navbar />
      {isLoading || loading ? (
        <div className="border rounded-3xl max-w-screen-xl flex items-center justify-center h-[80vh] my-28  mx-2 lg:mx-auto">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="mt-28 mx-2 lg:mx-auto max-w-screen-xl">
          <p className="text-3xl font-medium ">Profile Settings</p>
          <div className="border rounded-3xl w-full my-6 p-6 ">
            <div className="flex items-center justify-between">
              <p className="text-3xl font-medium">Account</p>
              <div
                className="rounded-full p-[5px] hover:bg-opacity-80 border-[2px] border-primary bg-gray-50 cursor-pointer transition-all"
                onClick={() => setShowModal(true)}
              >
                <MdEdit className="text-primary text-lg" />
              </div>
            </div>
            {accountData?.map((item, index) => (
              <div className="my-4" key={index}>
                <p className=" text-lg mb-[1px] font-medium">{item.name}</p>
                <p className="text-lg ">{item.value ?? "Not added"}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
      <AnimatePresence initial={false} onExitComplete={() => null}>
        {showModal && (
          <AddSettingsModal
            setShowSettingsModal={setShowModal}
            showSettingsModal={showModal}
            userProfile={userProfile}
            initialData={{
              first_name: userProfile?.user?.first_name,
              lastName: userProfile?.user?.lastName,
              category: {
                value: userProfile?.category?._id,
                label: userProfile?.category?.name,
              },
              country: {
                value: userProfile?.country,
                label: userProfile?.country,
                cities: cities,
              },
              city: {
                value: userProfile?.city,
                label: userProfile?.city,
              },
              timezone: userProfile?.timezone,
            }}
            isEdit={true}
          />
        )}
      </AnimatePresence>
    </ProtectedRoute>
  );
}
