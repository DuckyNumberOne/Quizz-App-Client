import React from "react";
import Image from "next/image";
import Form from "@/lib/components/common/Form";
import Input from "@/lib/components/common/Input";
import Select from "@/lib/components/common/Select/DefaultSelect";
import { QuizzPost } from "@/lib/modal/quizz";
import ButtonDefault from "@/lib/components/common/Button/ButtonDefault";

export default function index() {
  const handleSubmitForm = async (data: QuizzPost) => {
    console.log("🚀 ~ handleSubmitForm ~ data:", data);
  };

  const options = [
    {
      value: "game",
      text: "Game",
    },
    {
      value: "study",
      text: "Study",
    },
    {
      value: "entertainment",
      text: "Entertainment",
    },
  ];

  const visibility = [
    { id: 1111, name: "Public", value: "public" },
    { id: 2222, name: "Private", value: "private" },
  ];

  const quizzType = [
    {
      id: 1,
      title: "Quiz",
      color: "#ff2d55",
      urlThumbnail:
        "https://www.shutterstock.com/shutterstock/photos/2052894734/display_1500/stock-vector-quiz-and-question-marks-trivia-night-quiz-symbol-neon-sign-night-online-game-with-questions-2052894734.jpg",
      link: "CreateQuestion",
      icon: require("../../../public/images/quizzes-question.png"),
    },
    {
      id: 2,
      title: "Puzz",
      color: "#86a884",
      urlThumbnail:
        "https://www.ikea.com/sg/en/images/products/aftonsparv-puzzle__1242247_pe920114_s5.jpg",
      link: "CreateQuestion",
      icon: require("../../../public/images/puzzle.png"),
    },
    {
      id: 3,
      title: "True or False",
      color: "#30b0c7",
      urlThumbnail:
        "https://play-lh.googleusercontent.com/OF0KkqC26u-3q0-nFV3jdBNtJYtdvOjYsHYC-N0B2VscdmlM1yUodqf20lHxWyyC65c",
      link: "CreateQuestion",
      icon: require("../../../public/images/trueoffalse.png"),
    },
    {
      id: 4,
      title: "Audio",
      color: "#af52de",
      urlThumbnail:
        "https://images.unsplash.com/photo-1519874179391-3ebc752241dd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ",
      link: "CreateQuestion",
      icon: require("../../../public/images/audio.png"),
    },
    {
      id: 5,
      title: "Poll",
      color: "#ff9500",
      urlThumbnail:
        "https://www.voxco.com/wp-content/uploads/2021/09/Opinion-Polls1.png",
      link: "CreateQuestion",
      icon: require("../../../public/images/poll.png"),
    },
    {
      id: 6,
      title: "Word",
      color: "#ffcc00",
      urlThumbnail:
        "https://galined.com/wp-content/uploads/2017/02/Research-paper-Writing.jpg",
      link: "CreateQuestion",
      icon: require("../../../public/images/notepad.png"),
    },
  ];

  return (
    <div className="bg-[#f2f2f2] h-screen">
      <div className="grid grid-cols-12 ">
        <div className="mx-6 pt-4 col-span-4">
          <div className="px-3 py-4 border md:p-4 bg-white border-[#e5e5e5] my-4 rounded-lg h-full">
            <div className="text-xl font-bold py-4">Create Quizer 🙋</div>
            <Form classForm="mt-6" onSubmitForm={handleSubmitForm}>
              {(props: any) => (
                <>
                  <div className="space-y-4">
                    <Input
                      label="Url Thumbnail"
                      name="urlThumbnail"
                      type="text"
                      register={props.registers}
                      errors={props.error}
                      placeholder="Url Thumbnail"
                      errorsOption={{
                        required: {
                          value: true,
                          message: "Url Thumbnail is empty",
                        },
                      }}
                      classLabel="hidden"
                      classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                    />
                    <Input
                      label="Title"
                      name="title"
                      type="text"
                      register={props.registers}
                      errors={props.error}
                      placeholder="Title"
                      errorsOption={{
                        required: {
                          value: true,
                          message: "Title is empty",
                        },
                        maxLength: {
                          value: 50,
                          message: "Title cannot exceed 50 characters",
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
                      label="Description"
                      name="description"
                      type="text"
                      register={props.registers}
                      errors={props.error}
                      placeholder="Description"
                      errorsOption={{
                        required: {
                          value: true,
                          message: "Description is empty",
                        },
                        maxLength: {
                          value: 500,
                          message: "Description cannot exceed 500 characters",
                        },
                        minLength: {
                          value: 16,
                          message:
                            "Description must not be less than 16 characters",
                        },
                      }}
                      classLabel="hidden"
                      classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                    />
                    <Select
                      label="Collection"
                      name="idCollection"
                      register={props.registers}
                      errors={props.error}
                      textSelect="Choose Collection"
                      errorsOption={{
                        required: {
                          value: true,
                          message: "Collection is empty",
                        },
                      }}
                      classLabel="hidden"
                      classSelect="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                      options={options}
                    />
                    <Select
                      label="Visibility"
                      name="visibility"
                      register={props.registers}
                      errors={props.error}
                      textSelect="Choose Visibility"
                      errorsOption={{
                        required: {
                          value: true,
                          message: "Visibility is empty",
                        },
                      }}
                      classLabel="hidden"
                      classSelect="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                      options={visibility}
                    />
                    <Input
                      label="Keyword"
                      name="keyword"
                      type="text"
                      register={props.registers}
                      errors={props.error}
                      placeholder="Keyword"
                      errorsOption={{
                        required: {
                          value: true,
                          message: "Keyword is empty",
                        },
                        maxLength: {
                          value: 50,
                          message: "Keyword cannot exceed 50 characters",
                        },
                        minLength: {
                          value: 2,
                          message: "Keyword must not be less than 2 characters",
                        },
                      }}
                      classLabel="hidden"
                      classInput="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                    />
                  </div>
                  <div className="flex items-center justify-center w-full mt-6">
                    <ButtonDefault
                      content="Creat quzier"
                      className="font-bold text-white bg-black rounded-full py-3 px-8 text-lg  hover:text-black hover:bg-white hover:shadow-sm hover:shadow-black ease-in-out duration-300 w-full"
                    />
                  </div>
                </>
              )}
            </Form>
          </div>
        </div>
        <div className="mx-6 pt-4 col-span-8">
          <div className="px-3 py-4 border md:p-4 bg-white border-[#e5e5e5] my-4 rounded-lg h-full">
            <div className="text-xl font-bold py-4">
              {quizzType.map((items) => (
                <div key={items.id}>
                  <img src={items.urlThumbnail} alt={items.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
