import ButtonDefault from "@/lib/components/common/button/ButtonDefault";
import { setTurnOffPopup, setTurnOnPopup } from "@lib/state/popup/popupSlice";
import { addQuestions } from "@lib/state/questions/questionSlice";
import { generateUniqueId } from "@/utils/generateUniqueId";
import Image from "next/image";
import { ChangeEvent, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";

interface OriginalDataItem {
  title: string;
  imgQuestion: string;
  time: number;
  point: number;
  text1: string;
  isCorrect1: number;
  text2: string;
  isCorrect2: number;
  text3: string;
  isCorrect3: number;
  text4: string;
  isCorrect4: number;
}

interface NewDataItem {
  title: string;
  imgQuestion: string;
  time: number;
  point: number;
  anwsers: { number: number; text: string; isCorrect: boolean }[];
}

interface Question {
  title: string;
  imgQuestion: string;
  time: number;
  point: number;
  text1: string;
  isCorrect1: number;
  text2: string;
  isCorrect2: number;
  text3: string;
  isCorrect3: number;
  text4: string;
  isCorrect4: number;
}

const DefaultCreateQuizerByExcel = () => {
  const dispatch = useDispatch();
  // on change states
  const [excelFile, setExcelFile] = useState<string | ArrayBuffer | null>(null);
  const [excelFileError, setExcelFileError] = useState("");
  // submit
  const [excelData, setExcelData] = useState<Question[]>([]);
  const [notification, setNotification] = useState(true);

  const convertDataFormat = (
    originalData: OriginalDataItem[]
  ): NewDataItem[] => {
    return originalData.map((item) => {
      const anwsers = [
        { number: 1, text: item.text1, isCorrect: item.isCorrect1 === 1 },
        { number: 2, text: item.text2, isCorrect: item.isCorrect2 === 1 },
        { number: 3, text: item.text3, isCorrect: item.isCorrect3 === 1 },
        { number: 4, text: item.text4, isCorrect: item.isCorrect4 === 1 },
      ];
      return {
        _id: generateUniqueId(),
        title: item.title,
        imgQuestion: item.imgQuestion,
        time: item.time,
        point: item.point,
        anwsers: anwsers,
      };
    });
  };

  const fileType = ["application/vnd.ms-excel"];

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    let selectedFile =
      e.target.files && e.target.files.length > 0 && e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          if (e.target?.result) {
            setExcelFileError("");
            setExcelFile(e.target.result);
          }
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  // submit function
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data: SetStateAction<Question[]> =
        XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    } else {
      setExcelData([]);
    }
  };
  const convertExcelData = convertDataFormat(excelData);

  const handleSubmitQuestion = () => {
    dispatch(setTurnOffPopup("popup_create_mode_excel"));
    dispatch(setTurnOnPopup("popup_create_question"));
    dispatch(addQuestions(convertExcelData));
  };

  return (
    <div className="border relative bg-white border-[#e5e5e5] my-4 rounded-lg h-[935px]">
      {notification ? (
        <div className="fade-in-05s bg-black-shadow rounded-lg w-full h-full absolute top-0 right-0 flex items-center justify-center">
          <div className="fade-in-1s w-[600px] h-[600px] bg-white rounded-2xl">
            <h3 className="text-center text-2xl font-bold mt-10">RULE</h3>
            <ul className="space-y-4 text-start p-5 text-lg font-medium">
              <li>
                <p>
                  - Do not add more than{" "}
                  <span className="text-rose-600">3</span> correct answers per
                  question.
                </p>
              </li>
              <li>
                <p>- Question titles cannot be duplicated.</p>
              </li>
              <li>
                <p>- Do not give duplicate answers to the same question.</p>
              </li>
              <li>
                <p>
                  - The number of questions must be from{" "}
                  <span className="text-rose-600">5</span> to{" "}
                  <span className="text-rose-600">20</span>.
                </p>
              </li>
              <li>
                <p>
                  - The file format must be{" "}
                  <span className="text-rose-600">.xls</span>.
                </p>
              </li>
              <li>
                <p>
                  - You can download the sample file here{" "}
                  <a
                    href="/excel/originalFile.xls"
                    download="originalFile.xls"
                    className="text-blue-600 underline"
                  >
                    here
                  </a>
                </p>
              </li>
            </ul>
            <div className="flex justify-center items-center">
              <ButtonDefault
                content="Ok !"
                className="mt-18 font-bold text-white bg-black rounded-full py-3 px-8 text-lg  hover:text-black hover:bg-white hover:shadow-sm hover:shadow-black ease-in-out duration-300 w-10/12 "
                onClick={() => setNotification(false)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* upload file section */}
          <div className="form px-3 py-4 md:p-4 ">
            <form
              className="form-group"
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <label>
                <h5 className="font-bold text-xl">Upload Excel file</h5>
              </label>
              <br></br>
              <div className="border w-full flex justify-center items-center p-5">
                <div>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFile}
                    required
                  />
                  {excelFileError && (
                    <div
                      className="text-danger"
                      style={{ marginTop: 5 + "px" }}
                    >
                      {excelFileError}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#8854c0] text-white font-medium rounded-lg"
                    style={{ marginTop: 5 + "px" }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* view file section */}
          <div className="viewer mx-5">
            <p
              className={`mt-5 text-center ${
                excelData.length === 0
                  ? "border-x border-t border-b"
                  : "border-x border-t"
              }`}
            >
              View Excel file
            </p>
            {excelData.length === 0 && <>No file selected</>}
            {excelData.length > 0 && (
              <div className="">
                <div className="border">
                  <div>
                    <div className="grid grid-cols-12 mr-1">
                      <div className="font-semibold text-xs border-r border-b p-1">
                        <p>Title</p>
                      </div>
                      <div className="font-semibold text-xs border-r border-b p-1">
                        <p>ImgQuestion</p>
                      </div>
                      <div className="font-semibold text-xs border-r border-b p-1">
                        <p className="text-center">Time</p>
                      </div>
                      <div className="font-semibold text-xs border-r border-b p-1">
                        <p className="text-center">Point</p>
                      </div>
                      <div className="font-semibold text-xs border-r border-b p-1">
                        <p>Text1</p>
                      </div>
                      <div className="font-semibold text-xs border-r border-b p-1">
                        <p className="text-center">IsCorrect1</p>
                      </div>
                      <div className="font-semibold text-xs border-r border-b p-1">
                        <p>Text2</p>
                      </div>
                      <div className="font-semibold text-xs border-r border-b p-1">
                        <p className="text-center">IsCorrect2</p>
                      </div>
                      <div className="font-semibold text-xs border-r border-b p-1">
                        <p>Text3</p>
                      </div>
                      <div className="font-semibold text-xs border-r border-b p-1">
                        <p className="text-center">IsCorrect3</p>
                      </div>
                      <div className="font-semibold text-xs border-r border-b p-1">
                        <p>Text4</p>
                      </div>
                      <div className="font-semibold text-xs border-b p-1">
                        <p className="text-center">IsCorrect4</p>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-y-scroll h-[550px]">
                    {excelData.map((items, index) => (
                      <div className="grid grid-cols-12 h-[270px]" key={index}>
                        <div className={`border-r border-b text-xs p-1`}>
                          <p className="break-words">{items.title}</p>
                        </div>
                        <div className={`border-r border-b text-xs p-1`}>
                          <p className="break-words">{items.imgQuestion}</p>
                        </div>
                        <div className={`border-r border-b text-xs p-1`}>
                          <p className="break-words text-center">
                            {items.time}
                          </p>
                        </div>
                        <div className={`border-r border-b text-xs p-1`}>
                          <p className="break-words text-center">
                            {items.point}
                          </p>
                        </div>
                        <div className={`border-r border-b text-xs p-1`}>
                          <p className="break-words">{items.text1}</p>
                        </div>
                        <div className={`border-r border-b text-xs p-1`}>
                          <p className="break-words text-center">
                            {items.isCorrect1 === 1
                              ? String(true)
                              : String(false)}
                          </p>
                        </div>
                        <div className={`border-r border-b text-xs p-1`}>
                          <p className="break-words">{items.text2}</p>
                        </div>
                        <div className={`border-r border-b text-xs p-1`}>
                          <p className="break-words text-center">
                            {items.isCorrect2 === 1
                              ? String(true)
                              : String(false)}
                          </p>
                        </div>
                        <div className={`border-r border-b text-xs p-1`}>
                          <p className="break-words">{items.text3}</p>
                        </div>
                        <div className={`border-r border-b text-xs p-1`}>
                          <p className="break-words text-center">
                            {items.isCorrect3 === 1
                              ? String(true)
                              : String(false)}
                          </p>
                        </div>
                        <div className={`border-r border-b text-xs p-1`}>
                          <p className="break-words">{items.text4}</p>
                        </div>
                        <div className={`border-r border-b text-xs p-1`}>
                          <p className="break-words text-center">
                            {items.isCorrect4 === 1
                              ? String(true)
                              : String(false)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-full relative flex justify-end px-5 py-4">
                    <button
                      className=" bg-white shadow-4 rounded-full flex items-center justify-between p-4 gap-5"
                      onClick={handleSubmitQuestion}
                    >
                      <p className="text-base font-medium">
                        Export file as question
                      </p>
                      <button className="flex items-center justify-center">
                        <Image
                          src="/incons/right-arrow.png"
                          width={30}
                          height={30}
                          className=""
                          alt="Right arrow"
                        />
                      </button>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DefaultCreateQuizerByExcel;
