import { getUserById, updateUser } from "@/api/user.api";
import ButtonDefault from "@/lib/components/common/buttons/buttonDefault";
import Form from "@lib/components/common/form/defaultForm";
import Input from "@lib/components/common/input/defaultInput";
import Select from "@lib/components/common/selects/defaultSelect";
import countries from "@lib/config/countries";
import { typeAccount } from "@lib/config/typeAccount";
import useLocalStorage from "@lib/hook/useLocalStorage";
import { User, UserOption } from "@/lib/interface/user.interface";
import { RootState } from "@lib/state/store";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface PropRecovertUser {
  fullName: string;
  username: string;
  typeAccount: string;
  dateBirday: string;
  phoneNumber: string;
  country: string;
  urlAvatar: string;
  email: string;
  admin: boolean;
}

const MyProfile = () => {
  const [popupEditProfile, setPopupEditProfile] = useState(false);
  const { query, push } = useRouter();
  const param = query.id;
  const [inforUser, setInforUser] = useLocalStorage("user", "");
  const [error, setError] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const [dataUser, setDataUser] = useState(user);

  const dataUserFiltered: UserOption = { ...dataUser };
  delete dataUserFiltered.createdAt;
  delete dataUserFiltered.password;
  delete dataUserFiltered.updatedAt;
  delete dataUserFiltered._id;
  delete dataUserFiltered.__v;

  const fetch = async () => {
    const res = await getUserById(String(param));
    setDataUser(res);
  };

  const handleOpenPopupEdit = () => {
    setPopupEditProfile(!popupEditProfile);
  };

  const optionCountry = countries.map((items) => ({
    ...items,
    title: items.name,
    value: items.name,
  }));

  const handleSubmitForm = async (data: User) => {
    try {
      const res = await updateUser(data, String(param));
      if (res) {
        setInforUser(res);
        alert("Edited profile successfully !!!");
        fetch();
      }
    } catch (error: any) {
      setError(String(error?.response?.data));
      setTimeout(() => {
        setError("");
      }, 1500);
    }
  };

  useEffect(() => {
    if (param != undefined) {
      fetch();
    }
  }, [param]);
  return (
    <div
      className={`bg-bts-hero-search-bg bg-no-repeat bg-right bg-cover h-screen`}
    >
      <div className="max-w-7xl">
        <div className="grid grid-cols-12">
          <div
            className={`mx-6 pt-4 col-span-6  ${
              !popupEditProfile ? "col-start-6 fade-in-05s" : "slide-left "
            } h-full`}
          >
            <div className="bg-white border-white border-4  my-4 rounded-lg h-full shadow-2 shadow-purple-500">
              <div className="relative h-[200px] rounded-b-3xl">
                <Image
                  src="/images/background-my-profile.jpg"
                  width={400}
                  height={150}
                  alt="background-profile"
                  className="w-full bg-cover object-cover g h-full rounded-b-3xl"
                />
                <button
                  className="bg-white w-15 h-15 rounded-full absolute top-5 flex justify-center items-center shadow-4 right-4"
                  onClick={handleOpenPopupEdit}
                >
                  <Image
                    src="/images/edit.png"
                    width={40}
                    height={40}
                    alt="edit"
                  />
                </button>
                <div className="absolute w-full bottom-[-115px] flex justify-center">
                  <div>
                    <img
                      src={dataUser?.urlAvatar}
                      width={150}
                      height={150}
                      alt="avatar"
                      className="rounded-full border-6 border-white"
                    />
                    <p className="text-center font-medium">
                      {dataUser?.fullName}
                    </p>
                    {/* <p>@{dataUser.username}</p> */}
                  </div>
                </div>
              </div>
              <div className="mt-[160px] grid grid-cols-3 mx-5 rounded-md  border ">
                <div className="p-4 border-r flex items-center justify-center">
                  <div>
                    <h3 className="text-lg font-medium"> Quizer</h3>
                    <p className="text-center font-normal">12</p>
                  </div>
                </div>
                <div className="p-4 border-r flex items-center justify-center">
                  <div>
                    <h3 className="text-lg font-medium">Follower</h3>
                    <p className="text-center font-normal">12</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-center">
                  <div>
                    <h3 className="text-lg font-medium">Player</h3>
                    <p className="text-center font-normal">12</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 border rounded-md mx-5">
                <div className=" space-y-4 p-4">
                  <p className="border-b font-medium">Contry: </p>
                  <p className="border-b font-medium">Email: </p>
                  <p className="border-b font-medium">Birday: </p>
                  <p className="border-b font-medium">Phone number: </p>
                  <p className="border-b font-medium">Type account</p>
                  <p className="border-b font-medium">Time create account: </p>
                </div>
                <div className=" space-y-4 p-4 border-l">
                  <p className="border-b font-normal">{dataUser?.country}</p>
                  <p className="border-b font-normal">{dataUser?.email}</p>
                  <p className="border-b font-normal">{dataUser?.dateBirday}</p>
                  <p className="border-b font-normal">
                    {dataUser?.phoneNumber}
                  </p>
                  <p className="border-b font-normal">
                    {dataUser && dataUser?.typeAccount === "Loading...."
                      ? "Loading...."
                      : dataUser &&
                        typeAccount.filter(
                          (items) => items.id == dataUser?.typeAccount
                        )[0].title}
                  </p>
                  <p className="border-b">
                    {dataUser?.createdAt
                      ? dataUser?.createdAt.split("T")[0]
                      : "Loading...."}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`mx-6 pt-4 col-span-6  ${
              popupEditProfile ? "fade-in-1s" : "hidden "
            } h-full`}
          >
            <div className="bg-white border-white border-4  my-4 rounded-lg h-full shadow-2 shadow-purple-500">
              <h3 className="text-center mt-5 text-xl font-semibold">
                Edit profile
              </h3>
              <Form
                classForm="mt-3"
                onSubmitForm={handleSubmitForm}
                defaultValue={dataUserFiltered}
              >
                {(props: any) => (
                  <>
                    <div className="px-5 pt-5 space-y-6 ">
                      <Input
                        label="urlAvatar"
                        name="urlAvatar"
                        type="text"
                        register={props.registers}
                        errors={props.error}
                        defaultValue={dataUser?.urlAvatar}
                        placeholder="Title question"
                        errorsOption={{
                          required: {
                            value: true,
                            message: "Title is empty",
                          },
                          maxLength: {
                            value: 500,
                            message: "Title cannot exceed 500 characters",
                          },
                          minLength: {
                            value: 5,
                            message: "Title must not be less than 6 characters",
                          },
                        }}
                        classLabel="hidden"
                        classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                      />
                      <Input
                        register={props.registers}
                        errors={props.error}
                        label="Full name"
                        name="fullName"
                        type="text"
                        placeholder="Enter your name here"
                        errorsOption={{
                          required: {
                            value: true,
                            message: "Full name is empty",
                          },
                          maxLength: {
                            value: 50,
                            message: "Full name cannot exceed 50 characters",
                          },
                          minLength: {
                            value: 5,
                            message:
                              "Full name must not be less than 5 characters",
                          },
                        }}
                        classLabel="hidden"
                        classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                      />
                      <Select
                        label="Country"
                        name="country"
                        register={props.registers}
                        errors={props.error}
                        textSelect="Choose country"
                        errorsOption={{
                          required: {
                            value: true,
                            message: "Country is empty",
                          },
                        }}
                        classLabel="hidden"
                        classSelect="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                        options={optionCountry}
                      />
                      <Input
                        label="Full name"
                        name="email"
                        type="text"
                        register={props.registers}
                        errors={props.error}
                        placeholder="Title question"
                        errorsOption={{
                          required: {
                            value: true,
                            message: "Title is empty",
                          },
                          maxLength: {
                            value: 500,
                            message: "Title cannot exceed 500 characters",
                          },
                          minLength: {
                            value: 5,
                            message: "Title must not be less than 6 characters",
                          },
                        }}
                        classLabel="hidden"
                        classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                      />
                      {/* <Input
                        label="Password"
                        name="password"
                        type="text"
                        register={props.registers}
                        errors={props.error}
                        placeholder="••••••••"
                        errorsOption={{
                          required: {
                            value: true,
                            message: "Password is empty",
                          },
                          maxLength: {
                            value: 128,
                            message: "Password cannot exceed 128 char",
                          },
                          minLength: {
                            value: 8,
                            message: "Password must not be less than 8 char",
                          },
                        }}
                        classLabel="hidden"
                        classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                      /> */}
                      <Input
                        register={props.registers}
                        errors={props.error}
                        label="Date of birth"
                        name="dateBirday"
                        type="text"
                        placeholder="MM/DD/YYYY"
                        errorsOption={{
                          required: {
                            value: true,
                            message: "Date of birth is empty",
                          },
                          maxLength: {
                            value: 50,
                            message:
                              "Date of birth cannot exceed 50 characters",
                          },
                          minLength: {
                            value: 5,
                            message:
                              "Date of birth must not be less than 5 characters",
                          },
                        }}
                        classLabel="hidden"
                        classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                      />
                      <Input
                        label="Phone number"
                        name="phoneNumber"
                        type="text"
                        placeholder="+(84) XXX - XXXXX"
                        errorsOption={{
                          required: {
                            value: true,
                            message: "Phone number is empty",
                          },
                          maxLength: {
                            value: 13,
                            message: "Phone number cannot exceed 13 number",
                          },
                          minLength: {
                            value: 5,
                            message:
                              "Phone number must not be less than 5 number",
                          },
                        }}
                        register={props.registers}
                        errors={props.error}
                        classLabel="hidden"
                        classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                      />
                    </div>
                    <div className="flex items-center justify-center w-full mt-6">
                      <ButtonDefault
                        content="Edit profile"
                        className="mx-5 font-bold text-white bg-black rounded-full py-3 px-8 text-lg  hover:text-black hover:bg-white hover:shadow-sm hover:shadow-black ease-in-out duration-300 w-full"
                      />
                    </div>
                  </>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyProfile;
