import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import { setLoading } from "../../redux/reducers/loadingSlice";
import { getTerms } from "../../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

const Terms = () => {
  const loading = useSelector((state) => state.loading?.loading);
  const [terms, setTerms] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        // Fetch countries data
        const response = await dispatch(getTerms());
        setTerms(response.payload.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      dispatch(setLoading(false));
    };

    fetchData();
  }, [dispatch]);
  return (
    <div>
      <Head>
        <title>Terms & Conditions | KocFreelancing</title>
      </Head>
      <Navbar />
      {loading ? (
        <div className="border rounded-3xl max-w-screen-xl flex items-center justify-center h-[80vh] my-28  mx-auto">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="mt-28 mx-auto max-w-screen-xl">
          <div className="border rounded-3xl w-full my-6 p-6 ">
            <p className="text-3xl font-medium mb-6">Terms and Conditions</p>
            <p className="text-secondary">
              {terms?.terms ?? (
                <div className="flex items-center justify-center">
                  <Image
                    src="/assets/404.png"
                    width={400}
                    height={400}
                    alt="No Data Found"
                  />
                </div>
              )}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Terms;