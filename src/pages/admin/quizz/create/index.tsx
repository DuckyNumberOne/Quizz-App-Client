import React from "react";
import Image from "next/image";
import Form from "@/lib/components/common/Form";
import Input from "@/lib/components/common/Input";
import Select from "@/lib/components/common/Select/DefaultSelect";

export default function index() {
  const handleSubmitForm = async () => {};
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
  return (
    <div className="bg-[#f2f2f2] h-screen">
      <div className="grid grid-cols-12">
        <div className="mx-6 pt-4 col-span-4">
          <div className="px-3 py-4 border md:p-4 bg-white border-[#e5e5e5] my-4 rounded-lg">
            <div className="text-xl font-bold py-4">Create Quizer 🙋</div>
            <Form classForm="space-y-4 mt-6" onSubmitForm={handleSubmitForm}>
              {(props: any) => (
                <>
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
                    label="Category"
                    name="category"
                    register={props.registers}
                    errors={props.error}
                    textSelect="Choose category"
                    errorsOption={{
                      required: { value: true, message: "Category is empty" },
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
                      required: { value: true, message: "Visibility is empty" },
                    }}
                    classLabel="hidden"
                    classSelect="bg-[#f6f5fa] w-full px-5 py-5 rounded-[13px]"
                    options={options}
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
                </>
              )}
            </Form>
          </div>
        </div>
        <div className="mx-6 pt-4 col-span-8">
          <div className="px-3 py-4 border md:p-4 bg-white border-[#e5e5e5] my-4 rounded-lg h-[400px]">
            <div className="text-xl font-bold py-4">Sample</div>
          </div>
        </div>
      </div>
    </div>
  );
}
