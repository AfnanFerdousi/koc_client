import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Head from "next/head";
import { registerUser, resendEmail } from "@/axios/axios";
import PasswordField from "@/components/form/passwordField";
import StartAodornmentField from "@/components/form/startAodornmentField";
import TextField from "@/components/form/textField";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CategoryIcon from "@mui/icons-material/Category";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import { MdOutlineCategory } from "react-icons/md";
import { IconButton, Stack, Typography } from "@mui/material";
import Grow from "@mui/material/Grow";
import Link from "next/link";
import { LockReset } from "@mui/icons-material";
import { getCategories, getCountries } from "../../axios/axios";
import Select from "react-tailwindcss-select";

const SignupPage = () => {
  const [state, setState] = useState("signup");
  const [showResendButton, setShowResendButton] = useState(true);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState({
    signup: false,
    resendEmail: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onsubmit = async (data) => {
    setLoading({ ...loading, signup: true }); // Start loading for signup
    try {
      const response = await dispatch(
        registerUser({
          dynamicParams: {},
          bodyData: {
            ...data,
            country: selectedCountry.value,
            city: selectedCity.value,
            category: selectedCategory.value,
            role: "user",
          },
        })
      );
      console.log("response here", response);
      if (
        response.payload.statusCode === 200 ||
        response.payload.statusCode === 201
      ) {
        setState("verify");
        dispatch(
          resendEmail({
            dynamicParams: { email: data.email },
            bodyData: { email: data.email },
          })
        );
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading({ ...loading, signup: false }); // Stop loading for signup
    }
  };

  const handleResendEmail = async (email) => {
    setShowResendButton(false);
    setTimer(60);
    setLoading({ ...loading, resendEmail: true }); // Start loading for resend email
    try {
      const response = await dispatch(
        resendEmail({
          dynamicParams: { email: email },
          bodyData: { email: email },
        })
      );
      console.log("response here", response);
      if (
        response.payload.statusCode === 200 ||
        response.payload.statusCode === 201
      ) {
        toast.success("Email sent successfully!");
      }
    } catch (error) {
      console.error("Resend email failed:", error);
    } finally {
      setLoading({ ...loading, resendEmail: false }); // Stop loading for resend email
    }
  };
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [countriesOptions, setCountriesOptions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading({ ...loading, signup: true });
      try {
        // Fetch countries data
        const countriesResponse = await dispatch(getCountries());
        setCountriesOptions(
          countriesResponse?.payload?.data?.map((item) => ({
            value: item.name,
            label: item.name ?? "",
            cities: item.cities,
          }))
        );

        // Fetch categories data
        const categoriesResponse = await dispatch(getCategories(""));
        setCategoryOptions(
          categoriesResponse?.payload?.data?.map((item) => ({
            value: item._id,
            label: item.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading({ ...loading, signup: false });
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (selectedCountry) {
      const country = countriesOptions.find(
        (c) => c.value === selectedCountry.value
      );
      setCities(
        country
          ? country?.cities?.map((city) => ({ value: city, label: city }))
          : []
      );
    }
  }, [selectedCountry, countriesOptions]);
  useEffect(() => {
    if (selectedCountry) {
      if (!selectedCountry?.cities?.includes(selectedCity?.value)) {
        setSelectedCity("");
      }
    }
  }, [selectedCountry, countriesOptions, selectedCity?.value]);

  return (
    <Stack
      className="auth-back"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Head>
        <title>Signup | KOC Freelancing</title>
      </Head>
      <Grow in={true}>
        <Stack direction="row" justifyContent="center">
          {state === "signup" && (
            <div className="register-wrap rounded-none md:rounded-[10px]">
              <h4 className="auth-title">Kayıt Ol</h4>
              <form onSubmit={handleSubmit(onsubmit)}>
                <Stack direction="row" justifyContent="center">
                  <Stack sx={{ width: "80%" }}>
                    <Stack direction="row">
                      <div className="p-1 w-full">
                        <input
                          type="text"
                          id="first_name"
                          name="first_name"
                          {...register("first_name", { required: true })}
                          className=" bg-[#1f2029] focus:text-[#a09fa3] text-base border-none rounded-md border  p-3 w-full !outline-none  font-poppins"
                          placeholder="First Name"
                        />
                        {errors.first_name && (
                          <span className="w-full text-red-400 -mt-1 cursor-context-menu ml-1">
                            This field is required
                          </span>
                        )}
                      </div>
                      <div className="p-1 w-full">
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          {...register("lastName", { required: true })}
                          className=" bg-[#1f2029]  text-base border-none rounded-md border  p-3 w-full !outline-none  font-poppins"
                          placeholder="Last Name"
                        />
                        {errors.lastName && (
                          <span className="w-full text-red-400 -mt-1 cursor-context-menu ml-1">
                            This field is required
                          </span>
                        )}
                      </div>
                    </Stack>
                    <div className="">
                      <label
                        htmlFor="category"
                        className="col-span-full font-medium my-1"
                      >
                        Category
                      </label>
                      <Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e)}
                        options={categoryOptions}
                        isSearchable
                        loading={loading.signup}
                        primaryColor={"lime"}
                        placeholder="Select Category"
                        classNames={{
                          menuButton: ({ isDisabled }) =>
                            `flex rounded-lg  text-base border border-[#1f2029] p-[2px] shadow-sm transition-all duration-300 focus:outline-none ${
                              isDisabled
                                ? "bg-gray-100"
                                : "bg-[#1f2029] hover:border-gray-400 focus:border-primary focus:ring focus:ring-primary/10"
                            }`,
                          menu: "absolute z-10 w-full bg-[#1f2029] shadow-lg border rounded py-2 mt-1.5 rounded-lg text-base",
                          listItem: ({ isSelected }) =>
                            `block transition duration-200 p-2 rounded-lg cursor-pointer select-none truncate rounded text-base ${
                              isSelected
                                ? `text-white bg-primary`
                                : `text-base hover:bg-green-100 hover:text-primary`
                            }`,
                        }}
                      />
                    </div>
                    {errors.category && (
                      <span className="w-full text-red-500  -mt-1 cursor-context-menu">
                        This field is required
                      </span>
                    )}
                    <div className="">
                      <label
                        htmlFor="country"
                        className="col-span-full font-medium my-1"
                      >
                        Country
                      </label>
                      <Select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e)}
                        options={countriesOptions}
                        isSearchable
                        loading={loading.signup}
                        primaryColor={"lime"}
                        placeholder="Select Country"
                        classNames={{
                          menuButton: ({ isDisabled }) =>
                            `flex rounded-lg  text-base border border-[#1f2029] p-[2px] shadow-sm transition-all duration-300 focus:outline-none ${
                              isDisabled
                                ? "bg-gray-100"
                                : "bg-[#1f2029] hover:border-gray-400 focus:border-primary focus:ring focus:ring-primary/10"
                            }`,
                          menu: "absolute z-10 w-full bg-[#1f2029] shadow-lg border rounded py-2 mt-1.5 rounded-lg text-base",
                          listItem: ({ isSelected }) =>
                            `block transition duration-200 p-2 rounded-lg cursor-pointer select-none truncate rounded text-base ${
                              isSelected
                                ? `text-white bg-primary`
                                : `text-base hover:bg-green-100 hover:text-primary`
                            }`,
                        }}
                      />
                    </div>
                    {errors.country && (
                      <span className="w-full text-red-500  -mt-1 cursor-context-menu">
                        This field is required
                      </span>
                    )}
                    <div className="">
                      <label
                        htmlFor="city"
                        className="col-span-full font-medium my-1"
                      >
                        City
                      </label>
                      <div className="relative">
                        {console.log(
                          selectedCountry,
                          selectedCity?.value,
                          !!selectedCountry?.cities?.includes(
                            selectedCity?.value
                          )
                        )}
                        <Select
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e)}
                          options={cities}
                          isDisabled={cities?.length === 0}
                          isSearchable
                          loading={loading.signup}
                          primaryColor={"lime"}
                          placeholder="Select City"
                          classNames={{
                            menuButton: ({ isDisabled }) =>
                              `flex rounded-lg  text-base border border-[#1f2029] p-[2px] shadow-sm transition-all duration-300 focus:outline-none ${
                                isDisabled
                                  ? "bg-gray-100"
                                  : "bg-[#1f2029] hover:border-gray-400 focus:border-primary focus:ring focus:ring-primary/10"
                              }`,
                            menu: "absolute z-10 w-full bg-[#1f2029] shadow-lg border rounded py-2 mt-1.5 rounded-lg text-base",
                            listItem: ({ isSelected }) =>
                              `block transition duration-200 p-2 rounded-lg cursor-pointer select-none truncate rounded text-base ${
                                isSelected
                                  ? `text-white bg-primary`
                                  : `text-base hover:bg-green-100 hover:text-primary`
                              }`,
                          }}
                        />
                      </div>
                    </div>
                    {selectedCity === "" && (
                      <span className="w-full text-red-500  -mt-1 cursor-context-menu">
                        This field is required
                      </span>
                    )}
                    <div className="p-1">
                      <label
                        htmlFor="Phone"
                        className="col-span-full font-medium my-1"
                      >
                        Phone
                      </label>
                      <div className="bg-[#1f2029] rounded-md   p-3 w-full flex items-center ">
                        <LocalPhoneIcon sx={{ color: "#ffeba7" }} />
                        <input
                          type="tel"
                          id="phone_number"
                          name="phone_number"
                          {...register("phone_number", { required: true })}
                          className=" mx-2 bg-[#1f2029]  text-base border-none  w-full !outline-none  font-poppins"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    {errors.phone_number && (
                      <span className="w-full text-red-400 -mt-1 cursor-context-menu ml-1">
                        This field is required
                      </span>
                    )}
                    <div className="p-1">
                      <label
                        htmlFor="Email"
                        className="col-span-full font-medium my-1"
                      >
                        Email
                      </label>
                      <div className="bg-[#1f2029] rounded-md   p-3 w-full flex items-center ">
                        <MarkunreadIcon sx={{ color: "#ffeba7" }} />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          {...register("email", { required: true })}
                          className=" mx-2 bg-[#1f2029]  text-base border-none  w-full !outline-none  font-poppins"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>
                    {errors.email && (
                      <span className="w-full text-red-400 -mt-1 cursor-context-menu ml-1">
                        This field is required
                      </span>
                    )}
                    <div className="p-1">
                      <label
                        htmlFor="country"
                        className="col-span-full font-medium my-1"
                      >
                        Password
                      </label>
                      <div className="bg-[#1f2029] rounded-md   p-3 w-full flex items-center ">
                        <LockReset sx={{ color: "#ffeba7" }} />
                        <input
                          type="password"
                          id="password"
                          name="password"
                          {...register("password", { required: true })}
                          className=" mx-2 bg-[#1f2029]  text-base border-none  w-full !outline-none  font-poppins"
                          placeholder="password"
                        />
                      </div>
                    </div>
                    {errors.password && (
                      <span className="w-full text-red-400 -mt-1 cursor-context-menu ml-1">
                        Password must be atleast 6 characters
                      </span>
                    )}
                  </Stack>
                </Stack>
                <Stack direction="row" justifyContent="center">
                  {loading.signup ? (
                    <div className="btn !cursor-context-menu !px-16 hover:bg-[#ffeaa7af]">
                      <div className="loaderAuth mx-auto"></div>{" "}
                    </div>
                  ) : (
                    <button type="submit" className="btn">
                      Kayıt Ol
                    </button>
                  )}
                </Stack>
              </form>
              <Stack direction="row" justifyContent="center" alignSelf="center">
                <Typography sx={{ color: "#c4c3ca" }}>
                  Zaten hesabınız var mı?{" "}
                </Typography>
                <Link href="/auth/login" className="auth-change-btn">
                  Log In
                </Link>
              </Stack>
            </div>
          )}
          {state === "verify" ? (
            <div className="reset-wrap">
              <Stack direction="row" justifyContent="start" alignItems="center">
                <IconButton
                  onClick={() => setState("signup")}
                  sx={{ marginLeft: "20px" }}
                >
                  <ArrowBackIosNewIcon sx={{ color: "grey" }} />
                </IconButton>
                <h4 className="auth-title">Verify Your Email</h4>
              </Stack>
              <Stack
                direction="column"
                justifyContent="start"
                alignSelf="center"
                paddingX="45px"
              >
                <Typography sx={{ color: "#c4c3ca" }}>
                  We have sent a verification email to your inbox. Verify your
                  email to continue.{" "}
                </Typography>
                <br />
                <Typography sx={{ color: "#c4c3ca" }}>
                  Didn&apos;t receive an email?{" "}
                  {showResendButton ? (
                    <span
                      className="auth-change-btn cursor-pointer"
                      onClick={() => handleResendEmail(email)}
                    >
                      Resend email.
                    </span>
                  ) : (
                    <span>{`Resend email in ${timer} seconds.`}</span>
                  )}
                </Typography>
              </Stack>
            </div>
          ) : state === "loggedIn" ? (
            <div className="reset-wrap">
              <Stack direction="row" justifyContent="start" alignItems="center">
                <h4 className="auth-title">There&apos;s nothing here</h4>
              </Stack>
              <Stack
                direction="column"
                justifyContent="start"
                alignSelf="center"
                paddingX="45px"
              >
                <Typography sx={{ color: "#c4c3ca" }}>
                  You are already logged in.
                </Typography>
                <br />
                <Typography sx={{ color: "#c4c3ca" }}>
                  <Link href="/" className="auth-change-btn cursor-pointer">
                    Go back to home.
                  </Link>
                </Typography>
              </Stack>
            </div>
          ) : null}
        </Stack>
      </Grow>
    </Stack>
  );
};

export default SignupPage;
