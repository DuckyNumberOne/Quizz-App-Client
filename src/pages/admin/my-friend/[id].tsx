import React, { useEffect, useState } from "react";
import Image from "next/image";
import { deleteFriend, getItemFriend } from "@/api/friend";
import { useRouter } from "next/router";
import { Friend, FriendOption } from "@/lib/modal/friend";
import ButtonDefault from "@/lib/components/common/Button/ButtonDefault";
import { getItemQuizzByUser } from "@/api/quizz";
import Link from "next/link";
import { Anwsers } from "@/lib/modal/question";

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

const MyFriend = () => {
  const { query } = useRouter();
  const fetch = async () => {
    const res = await getItemFriend(String(query.id));
    setDataListFriend(res);
  };
  const fetchListQuizz = async (idFriend: String) => {
    const res = await getItemQuizzByUser(String(idFriend));
    setDataQuizByUser(res);
  };
  const [dataListFriend, setDataListFriend] = useState<FriendOption[]>([]);
  const [indexs, setIndex] = useState(-1);
  const [dataQuizByUser, setDataQuizByUser] = useState<Quizz[]>([]);
  const handleUnfollow = async (id: string) => {
    try {
      const res = await deleteFriend(id);
      if (res) {
        fetch();
        alert("Delete success !");
      }
    } catch (error: any) {
      if (error?.response?.data) {
        alert(error?.response?.data);
      }
    }
  };

  const handleCheckProfile = (index: number) => {
    setIndex(index);
  };

  const handleListQuizz = async (idFriend: string) => {
    await fetchListQuizz(idFriend);
  };

  useEffect(() => {
    if (query.id !== undefined) {
      fetch();
    }
  }, []);
  return (
    <div className="bg-background-my-friend bg-cover h-screen bg-center bg-no-repeat">
      <div className="absolute inset-0 w-full h-screen bg-black-shadow-2 flex justify-center items-center">
        <div className="container mx-auto grid-cols-12 grid h-[700px] gap-2">
          <div
            className={`col-span-4 bg-white p-5 ${
              indexs !== -1 ? "slide-left" : "col-start-5"
            }`}
          >
            <h3 className="text-2xl font-semibold">List friends</h3>
            {dataListFriend.length > 5 && (
              <nav>
                <div className="w-full mx-auto px-4 py-2 border rounded-lg flex items-center">
                  <input
                    type="text"
                    className="max-w-full w-full focus:outline-none"
                    placeholder="Search quizz here ...."
                  />
                  <div className="bg-[#c92127] flex items-center justify-center w-20 h-10 px-5 py-[7px] rounded-md cursor-pointer">
                    <Image
                      src="/images/search(1).png"
                      width={20}
                      height={20}
                      alt="search"
                    />
                  </div>
                </div>
              </nav>
            )}
            <div className={`mt-5 space-y-4 h-[600px] overflow-y-scroll p-4`}>
              {dataListFriend.length > 0 ? (
                dataListFriend.map((items, index) => (
                  <div
                    key={items._id}
                    className="flex border-2 p-4 relative cursor-pointer"
                    onClick={() => handleCheckProfile(index)}
                  >
                    <div className="">
                      <img
                        src={items.friendId.urlAvatar}
                        alt="Avatar"
                        width={70}
                        height={70}
                        className="rounded-full mr-4 border-4"
                      />
                    </div>
                    <div>
                      <div className="flex">
                        <p className="font-semibold">
                          {items.friendId.fullName}
                        </p>
                        <p className="ml-2 text-sm">
                          ({items.friendId.country})
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-graydark">
                          {items.friendId.email}
                        </p>
                      </div>
                      <ButtonDefault
                        content="Unfollow"
                        className="absolute right-3 bg-black text-white px-4 py-1 rounded-full font-medium hover:bg-rose-600 ease-in-out duration-200"
                        onClick={() => handleUnfollow(String(items._id))}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <p>You don't have any friends yet !!!</p>
                  </div>
                </>
              )}
            </div>
          </div>
          {indexs !== -1 && (
            <>
              <div
                className={`col-span-4 relative ${
                  indexs !== -1 ? "fade-in-1s" : ""
                }`}
              >
                <div className="h-1/4"></div>
                <div className="bg-white h-3/4 rounded-t-2xl relative">
                  <div className="-top-20 right-40 absolute">
                    <img
                      src={dataListFriend[indexs].friendId.urlAvatar}
                      alt="Avatar"
                      width={160}
                      height={160}
                      className="rounded-full border-4 "
                    />
                    <p className="text-center font-semibold mt-3 text-xl">
                      {dataListFriend[indexs].friendId.fullName}
                    </p>
                  </div>
                  <div className="grid grid-cols-3  w-full pt-[140px] px-5 mb-5">
                    <div className="border-x border-y text-center">
                      <p className="font-semibold">Quizer</p>
                      <p>12</p>
                    </div>
                    <div className="border-r border-y text-center">
                      <p className="font-semibold">Follower</p>
                      <p>12</p>
                    </div>
                    <div className="border-r border-y text-center">
                      <p className="font-semibold">Player</p>
                      <p>12</p>
                    </div>
                  </div>
                  <div className="px-5  grid grid-cols-2">
                    <div>
                      <p className="p-3 border-x border-y font-bold">Email:</p>
                      <p className="p-3 border-x border-b font-bold">
                        Country:
                      </p>
                      <p className="p-3 border-x border-b font-bold">Birday:</p>
                      <p className="p-3 border-x border-b font-bold">
                        Phone number:
                      </p>
                      <p className="p-3 border-x border-b font-bold">
                        Time create accout:
                      </p>
                    </div>
                    <div>
                      <p className="p-3 border-r border-y">
                        {" "}
                        {dataListFriend[indexs].friendId.email}
                      </p>
                      <p className="p-3 border-r border-b">
                        {" "}
                        {dataListFriend[indexs].friendId.country}
                      </p>
                      <p className="p-3 border-r border-b">
                        {" "}
                        {dataListFriend[indexs].friendId.dateBirday}
                      </p>
                      <p className="p-3 border-r border-b">
                        {" "}
                        {dataListFriend[indexs].friendId.phoneNumber}
                      </p>
                      <p className="p-3 border-r border-b">
                        {
                          dataListFriend[indexs].friendId.createdAt.split(
                            "T"
                          )[0]
                        }
                      </p>
                    </div>
                  </div>

                  {dataQuizByUser.length !== 0 && (
                    <ButtonDefault
                      content="View this user's quiz list"
                      className="text-xl mt-5 text-center w-full hover:text-blue-500 font-semibold"
                      onClick={() =>
                        handleListQuizz(
                          String(dataListFriend[indexs].friendId._id)
                        )
                      }
                    />
                  )}
                </div>
              </div>
              {dataQuizByUser.length > 0 && (
                <div
                  className={`col-span-4 relative bg-white p-5 ${
                    dataQuizByUser.length > 0 ? "fade-in-05s" : ""
                  }`}
                >
                  <p className="text-center text-2xl font-semibold">
                    List quizz
                  </p>
                  <div className="space-y-4 mt-5 h-[620px] overflow-y-scroll p-5">
                    {dataQuizByUser.map((qz, index) => (
                      <Link
                        key={index}
                        className={`border rounded-lg grid grid-cols-8 gap-2 cursor-pointer hover:bg-whiter `}
                        href={`/admin/quizz/${qz._id}`}
                      >
                        <div className="p-2 col-span-4">
                          <img
                            src={qz.urlThumbnail}
                            width={200}
                            height={200}
                            alt="Thumbnail"
                            className="h-[140px] w-[200px] bg-contain object-cover rounded-lg"
                          />
                        </div>
                        <div className="col-span-4">
                          <p className="font-medium text-base h-14">
                            {qz.title.length > 60
                              ? qz.title.substring(0, 60) + "..."
                              : qz.title}
                          </p>

                          <div className="grid grid-cols-2 p-1 h-fit gap-2">
                            <div className="flex justify-start gap-5 items-center border p-1 bg-white">
                              <p className="font-medium text-xs text-start ">
                                {qz.play} <span className="">played</span>
                              </p>
                            </div>

                            <div className="flex justify-start gap-5 items-center border p-1 bg-white">
                              <p className="font-medium text-xs text-start ">
                                {qz.idCollection.title}
                              </p>
                            </div>
                            <div className="flex justify-start gap-5 items-center border p-1 bg-white">
                              <p className="font-medium text-xs text-start ">
                                {qz.question.length} question
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default MyFriend;
