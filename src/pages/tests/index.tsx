import { QuestionPost } from "@/lib/modal/question";
import { ChangeEvent, SetStateAction, useState } from "react";
// import {Data} from './Components/Data'
import * as XLSX from "xlsx";

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

function Test() {
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState("");

  // submit
  const [excelData, setExcelData] = useState<Question[]>([]);
  console.log("🚀 ~ Test ~ excelData:", excelData);

  const fileType = ["application/vnd.ms-excel"];
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    let selectedFile =
      e.target.files && e.target.files.length > 0 && e.target.files[0];
    if (selectedFile) {
      // console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError("");
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
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

  return (
    <div className="container">
      {/* upload file section */}
      <div className="form">
        <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
          <label>
            <h5>Upload Excel file</h5>
          </label>
          <br></br>
          <input
            type="file"
            className="form-control"
            onChange={handleFile}
            required
          ></input>
          {excelFileError && (
            <div className="text-danger" style={{ marginTop: 5 + "px" }}>
              {excelFileError}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-success"
            style={{ marginTop: 5 + "px" }}
          >
            Submit
          </button>
        </form>
      </div>

      <br></br>
      <hr></hr>

      {/* view file section */}
      <h5>View Excel file</h5>
      <div className="viewer">
        {excelData.length === 0 && <>No file selected</>}
        {excelData.length > 0 && (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">ImgQuestion</th>
                  <th scope="col">Time</th>
                  <th scope="col">Point</th>
                  <th scope="col">Text1</th>
                  <th scope="col">IsCorrect1</th>
                  <th scope="col">Text1</th>
                  <th scope="col">IsCorrect1</th>
                  <th scope="col">Text1</th>
                  <th scope="col">IsCorrect1</th>
                  <th scope="col">Text1</th>
                  <th scope="col">IsCorrect1</th>
                </tr>
              </thead>
              <tbody>
                {excelData.map((items) => (
                  <tr>
                    <th>{items.title}</th>
                    <th>{items.imgQuestion}</th>
                    <th>{items.time}</th>
                    <th>{items.point}</th>
                    <th>{items.text1}</th>
                    <th>{items.isCorrect1}</th>
                    <th>{items.text2}</th>
                    <th>{items.isCorrect2}</th>
                    <th>{items.text3}</th>
                    <th>{items.isCorrect3}</th>
                    <th>{items.text4}</th>
                    <th>{items.isCorrect4}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Test;
