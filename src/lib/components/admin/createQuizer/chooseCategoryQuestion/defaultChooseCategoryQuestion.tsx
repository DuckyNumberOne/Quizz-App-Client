import { setTurnOffPopup, setTurnOnPopup } from "@lib/state/popup/popupSlice";
import React from "react";
import { useDispatch } from "react-redux";

const DefaultChooseCategoryQuestion = () => {
  const dispatch = useDispatch();

  const quizzType = [
    {
      id: 1,
      title: "Quiz",
      color: "#ff2d55",
      urlThumbnail:
        "https://www.shutterstock.com/shutterstock/photos/2052894734/display_1500/stock-vector-quiz-and-question-marks-trivia-night-quiz-symbol-neon-sign-night-online-game-with-questions-2052894734.jpg",
      link: "CreateQuestion",
      icon: "/images/quizzes-question.png",
    },
    {
      id: 2,
      title: "Puzz",
      color: "#86a884",
      urlThumbnail:
        "https://www.ikea.com/sg/en/images/products/aftonsparv-puzzle__1242247_pe920114_s5.jpg",
      link: "CreateQuestion",
      icon: "/images/puzzle.png",
    },
    {
      id: 3,
      title: "True or False",
      color: "#30b0c7",
      urlThumbnail:
        "https://play-lh.googleusercontent.com/OF0KkqC26u-3q0-nFV3jdBNtJYtdvOjYsHYC-N0B2VscdmlM1yUodqf20lHxWyyC65c",
      link: "CreateQuestion",
      icon: "/images/truefalse.png",
    },
    {
      id: 4,
      title: "Audio",
      color: "#af52de",
      urlThumbnail:
        "https://images.unsplash.com/photo-1519874179391-3ebc752241dd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ",
      link: "CreateQuestion",
      icon: "/images/audio.png",
    },
    {
      id: 5,
      title: "Poll",
      color: "#ff9500",
      urlThumbnail:
        "https://www.voxco.com/wp-content/uploads/2021/09/Opinion-Polls1.png",
      link: "CreateQuestion",
      icon: "/images/poll.png",
    },
    {
      id: 6,
      title: "Word",
      color: "#ffcc00",
      urlThumbnail:
        "https://galined.com/wp-content/uploads/2017/02/Research-paper-Writing.jpg",
      link: "CreateQuestion",
      icon: "/images/notepad.png",
    },
  ];

  const handleSubmit = () => {
    dispatch(setTurnOnPopup("popup_create_question"));
    dispatch(setTurnOffPopup("popup_choose_category_question"));
  };

  return (
    <div className="px-3 py-4 border md:p-4 bg-white border-[#e5e5e5] my-4 rounded-lg h-[935px] slide-left">
      <div className="grid grid-cols-2 grid-rows-3 gap-4 ">
        {quizzType.map((items) => (
          <div
            className="w-full h-full flex justify-center items-center"
            key={items.id}
          >
            <div
              key={items.id}
              className="w-[280px] h-[280px] rounded-xl relative shadow-2 shadow-white"
            >
              <img
                src={items.urlThumbnail}
                alt={items.title}
                className="bg-cover bg-center w-full h-full rounded-xl"
              />
              <div
                className="absolute inset-0 flex items-center justify-center bg-black-shadow-2 hover:bg-white-shadow-2 rounded-xl cursor-pointer"
                onClick={handleSubmit}
              >
                <img
                  src={items.icon}
                  alt={items.title}
                  width={65}
                  height={65}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DefaultChooseCategoryQuestion;
