import ButtonDefault from "@/lib/components/common/button/ButtonDefault";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import DefaulltSlider from "@/lib/components/common/slider/DefaulltSlider";
import { getListQuizz } from "@/api/quizz";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@lib/state/store";
import { setTurnOnPopup } from "@lib/state/popup/popupSlice";
import { scrollToTop } from "@/utils/scrollToTop";
import { getListCollection } from "@/api/collection";
import { getAllUserByFullName } from "@/api/user";
import { debounce } from "@/utils/debounce";
import { typeAccount } from "@lib/config/typeAccount";
import { getItemFriend, postFriend } from "@/api/friend";
import { Friend, FriendOption } from "@lib/modal/friend";
import { Anwsers } from "@lib/modal/question";
import DefaultLoadingPage from "@/lib/components/admin/loadingPage/defaultLoadingPage";

interface Question {
  title: string;
  imgQuestion: string;
  time: number;
  point: number;
  anwsers: Anwsers[];
  _id: string;
}

interface Collection {
  _id: string;
  title: string;
}

interface Quizz {
  _id: string;
  idUser: string;
  urlThumbnail: string;
  title: string;
  description: string;
  idCollection: Collection;
  visibility: string;
  keyword: string;
  play: number;
  share: number;
  question: Question[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserFindFriend {
  _id: string;
  fullName: string;
  typeAccount: string;
  country: string;
  urlAvatar: string;
}

const Admin = () => {
  const fetchDataQuiz = async () => {
    const res = await getListQuizz();
    setDataQuizz(res);
  };

  const fetchCollectionQuiz = async () => {
    const res = await getListCollection();
    setDataCollection(res);
  };

  const fetchFindFriend = async (fullName: string) => {
    const res = await getAllUserByFullName(fullName);
    setListfriend(res);
  };

  const fetchFriendWithId = async (id: string) => {
    const res = await getItemFriend(id);
    setListFriendByUserId(res);
  };

  const { push, pathname } = useRouter();
  const [valueFullName, setFullName] = useState("");
  const [PopupFindFriend, setPopupFindFriend] = useState(false);
  const [listFriendByUserId, setListFriendByUserId] = useState<FriendOption[]>(
    []
  );
  const [dataQuizz, setDataQuizz] = useState<Quizz[]>([]);
  const [dataCollection, setDataCollection] = useState<Collection[]>([]);

  const [listFriend, setListfriend] = useState<UserFindFriend[]>([]);
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  const handlePopupFindFriend = () => {
    if (PopupFindFriend) {
      document.body.classList.remove("disable-scroll");
    } else {
      document.body.classList.add("disable-scroll");
    }
    setPopupFindFriend(!PopupFindFriend);
  };

  const handleOpenQuizz = (id: string) => {
    scrollToTop("main-content");
    dispatch(setTurnOnPopup("popup_loading_page_admin"));
    setTimeout(() => {
      push(`admin/quizz/${id}`);
    }, 2000);
  };

  const debouncedCallback = debounce({
    delay: 1000,
    callback: (value: string) => {
      if (value === "" || value === " ") {
        fetchFindFriend("");
      } else {
        setFullName(value);
      }
    },
  });

  const handleChangeFindFriend = (e: any) => {
    debouncedCallback(e.target.value);
  };

  const handleAddFriend = async (id: string) => {
    const dataAddFriend = {
      userId: String(user._id),
      friendId: id,
    };
    try {
      const res = await postFriend(dataAddFriend);
      if (res) {
        alert("Add friend success !");
      }
    } catch (error: any) {
      if (error) {
        alert(error?.response?.data);
      }
    }
  };

  useEffect(() => {
    if (valueFullName !== "" && PopupFindFriend) {
      fetchFindFriend(valueFullName);
    }
  }, [valueFullName, PopupFindFriend]);

  useEffect(() => {
    if (PopupFindFriend && user._id !== "") {
      fetchFriendWithId(String(user._id));
    }
  }, [user, PopupFindFriend]);

  useEffect(() => {
    if (pathname) {
      fetchCollectionQuiz();
      fetchDataQuiz();
    }
  }, [pathname]);

  return (
    <div className="relative">
      {PopupFindFriend ? (
        <div className="bg-black-shadow z-10 absolute inset-0 w-full h-screen flex justify-center items-center">
          <div
            className={`bg-white w-[600px]  rounded-xl shadow-4 shadow-black relative z-10 ${
              listFriend !== undefined && listFriend.length > 0
                ? "fade-in-05s h-[600px]"
                : "slide-up h-[105px]"
            }`}
          >
            <Image
              src="/incons/close.png"
              width={30}
              height={30}
              alt="Close"
              className="absolute right-3 top-8 cursor-pointer"
              onClick={handlePopupFindFriend}
            />
            <div className="w-5/6 mt-4 mx-auto">
              <nav className=" px-4 py-2 border rounded-lg flex items-center mt-5">
                <input
                  type="text"
                  className="max-w-full w-full focus:outline-none"
                  placeholder="Search full name here ...."
                  onChange={handleChangeFindFriend}
                />
                <div className="bg-[#c92127] flex items-center justify-center w-20 h-10 px-5 py-[7px] rounded-md cursor-pointer">
                  <Image
                    src="/images/search(1).png"
                    width={20}
                    height={20}
                    alt="search"
                  />
                </div>
              </nav>
              {listFriend !== undefined && listFriend.length > 0 && (
                <div
                  className={` ${listFriend.length > 0 ? "fade-in-05s" : ""}`}
                >
                  <p className={`text-2xl font-semibold my-5`}>You may know</p>
                  <div className="h-[400px] overflow-y-scroll p-4 space-y-4">
                    {listFriend &&
                      listFriend.map((fr, index) => (
                        <div
                          className="flex items-center justify-between shadow-2 shadow-black rounded-2xl px-2 py-2"
                          key={index}
                        >
                          <div className="flex gap-4">
                            <img
                              src={fr.urlAvatar}
                              className="rounded-full w-20 h-20 border"
                              alt="avatar"
                            />
                            <div>
                              <p className="text-black font-semibold hover:text-blue-600 cursor-pointer">
                                {fr.fullName}{" "}
                                <span className="text-sm font-medium">
                                  ({fr.country})
                                </span>
                              </p>
                              <p className="">
                                {
                                  typeAccount.find(
                                    (item) => item.id === fr.typeAccount
                                  )?.title
                                }
                              </p>
                            </div>
                          </div>
                          {/* Ẩn ButtonDefault nếu fr._id tồn tại trong listFriendByUserId */}
                          {!listFriendByUserId.some(
                            (friend) => friend.friendId._id === fr._id
                          ) && (
                            <ButtonDefault
                              content="Follow"
                              className={`bg-black text-white py-4 px-5 rounded-full font-semibold hover:bg-white hover:text-black ease-in-out duration-300 shadow-2 hover:shadow-black ${
                                user._id === fr._id && "hidden"
                              }`}
                              onClick={() => handleAddFriend(fr._id)}
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <DefaultLoadingPage animation="popup-up">
          <section className="z-1 relative border-lilac-20% bg-purple-faded-2 pt-[90px] pb-8 bg-bts-hero-search-bg">
            <div className="mx-6">
              <div className="mt-2 w-full col-span-12 flex flex-col items-center z-20">
                <h1 className="text-dark-80% font-semibold flex flex-col items-center">
                  <span className="text-2xl">Welcome Home 👋</span>
                  <span className="text-3xl">What will you do today?</span>
                </h1>
              </div>
              <div className="bg-white h-[400px] mt-10 rounded-2xl shadow-4 relative">
                <p className="text-2xl text-[#AF52DE] text-center pt-8 font-semibold">
                  Play quiz together with your friends now!
                </p>

                <div className=" absolute bottom-20 w-full flex items-center justify-center">
                  <ButtonDefault
                    className="rounded-full text-white border-b-[5px] border-r-[4px] bg-black border-[#6d5ff6] w-2/5 h-14 hover:scale-105 ease-in-out duration-300"
                    content="Find friends"
                    onClick={handlePopupFindFriend}
                  />
                </div>
              </div>
            </div>
          </section>
          {/* Header Slider  */}
          <section className="bg-[#f2f2f2] h-fit px-6" id="welcome">
            {/* Demo Category 1*/}
            {dataCollection.map((col, index) => (
              <div key={index}>
                <div className="mb-4 pt-10">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      <Image
                        src="/images/admin/star.webp"
                        width={30}
                        height={30}
                        alt="star"
                      />
                      <h2 className="text-sm md:text-2xl text-dark-2 ml-2 font-semibold">
                        {col.title}
                      </h2>
                    </div>
                    <div className="flex gap-3 items-center justify-center px-3 py-1 text-xs font-semibold h-6 base text-lilac hover:text-lilac-light active:text-lilac-dark rounded-full secondary relative min-w-max ml-auto bg-lilac-faded  transition-colors duration-200 ease-in-out">
                      <ButtonDefault
                        className="text-black text-base"
                        content="More"
                        // onClick={handleFindFriend}
                      />
                      <Image
                        src="/incons/arrow-right.webp"
                        width={15}
                        height={15}
                        alt="Arrow right"
                      />
                    </div>
                  </div>
                </div>
                {/* Box Slider Category 1*/}
                <div className="flex max-w-full relative">
                  <DefaulltSlider>
                    {dataQuizz
                      .filter((item) => item.idCollection._id === col._id)
                      .map((item) => (
                        <div
                          key={item._id}
                          onClick={() => handleOpenQuizz(item._id)}
                          className="bg-white quiz-card shadow-md rounded-lg bg-light-3 text-left cursor-pointer hover:shadow-lg max-w-56 md:max-w-72"
                        >
                          <div className="overflow-hidden rounded-t-lg h-full">
                            <div className="w-56 md:w-72 h-30 md:h-40 flex items-center justify-around">
                              <img
                                src={item.urlThumbnail}
                                alt="Thumbnail"
                                className="w-full h-full bg-cover bg-center"
                              />
                            </div>
                            <div className="px-2.5 pt-2.5 pb-3.5 h-30">
                              <div className="px-2 py-1 bg-[#e2e2e2] w-fit text-xs rounded-md">
                                <span>{item.idCollection.title}</span>
                              </div>
                              <p className="mt-2 mb-4 text-sm md:text-base text-dark-2 font-semibold">
                                {item.title}
                              </p>
                              <div className="flex items-center justify-between text-tn md:text-xs text-dark-4 font-semibold mt-auto">
                                <div className="mr-1.5">
                                  {item.question.length} Question •{" "}
                                </div>
                                <div className="mr-1.5 ml-1.5">
                                  <p>{item.play} played</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </DefaulltSlider>
                </div>
              </div>
            ))}
          </section>
        </DefaultLoadingPage>
      )}
    </div>
  );
};
export default Admin;
