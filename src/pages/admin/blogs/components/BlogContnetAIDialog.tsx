import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import formateBlogAIContent from "@/utility/formateBlogAIContent";

const initialValues = {
  title: "",
  description: "",
  wordCount: 360,
  references: [""],
};

const validationSchema = Yup.object({
  title: Yup.string()
    .max(100, "Title must be 100 characters or less")
    .required("Blog title is required"),
  description: Yup.string()
    .max(1000, "Description must be 1000 characters or less")
    .required("Blog description is required"),
  wordCount: Yup.number()
    .min(300, "Minimum word count is 300")
    .max(1200, "Maximum word count is 1200")
    .required("Word count is required"),
  references: Yup.array()
    .of(
      Yup.string()
        .trim()
        .max(100, "Reference must be 100 characters or less")
        .notRequired()
    )
    .max(5, "You can add up to 5 references"),
});

export default function BlogContentAIDialog({
  isOpen,
  setIsOpen,
  aiRequest,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  aiRequest: (content: string) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        {/* Dialog Header */}
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Generate Blog Post Using Wavely AI
          </DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
            illum.
          </DialogDescription>
        </DialogHeader>

        {/* Formik Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={true}
          onSubmit={(values) => {
            console.log("Form Submitted:", values);
            aiRequest(formateBlogAIContent(values));
            setIsOpen(false);
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <DialogDescription className="space-y-4">
                {/* Blog Title */}
                <div className="space-y-1">
                  <Label htmlFor="title">Blog Title</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter your blog title"
                    value={values.title}
                    onChange={handleChange}
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                  )}
                </div>

                {/* Blog Description */}
                <div className="space-y-1">
                  <Label htmlFor="description">Blog Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide a brief description of your blog"
                    value={values.description}
                    onChange={handleChange}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>

                {/* Number of Words */}
                <div className="space-y-1">
                  <Label htmlFor="wordCount">Number of Words</Label>
                  <div className="flex justify-between items-center gap-2">
                    <span>300</span>
                    <Input
                      id="wordCount"
                      name="wordCount"
                      type="range"
                      min="300"
                      max="1200"
                      step="10"
                      value={values.wordCount}
                      onChange={handleChange}
                      className="flex-1"
                    />
                    <span>1200</span>
                  </div>
                  <div className="text-center mt-2">
                    Selected: {values.wordCount} words
                  </div>
                  {errors.wordCount && (
                    <p className="text-red-500 text-sm">{errors.wordCount}</p>
                  )}
                </div>

                {/* References */}
                <div className="space-y-1">
                  <Label>References (Optional, up to 5)</Label>
                  <FieldArray
                    name="references"
                    render={(arrayHelpers) => (
                      <div className="space-y-2">
                        {values.references.map((ref, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              id={`references.${index}`}
                              name={`references.${index}`}
                              type="text"
                              placeholder={`Reference ${index + 1}`}
                              value={ref}
                              onChange={handleChange}
                              className={
                                errors.references && errors.references[index]
                                  ? "border-red-500 flex-1"
                                  : "flex-1"
                              }
                            />
                            {values.references.length > 1 && (
                              <Button
                                className="px-2"
                                type="button"
                                variant="destructive"
                                onClick={() => arrayHelpers.remove(index)}
                                aria-label={`Remove Reference ${index + 1}`}
                              >
                                {/* <X /> */}
                                <Trash2 size={18} />
                              </Button>
                            )}
                          </div>
                        ))}
                        {/* General Array Error */}
                        {typeof errors.references === "string" && (
                          <p className="text-red-500 text-sm">
                            {errors.references}
                          </p>
                        )}
                        {/* Add Reference Button */}
                        {values.references.length < 5 && (
                          <Button
                            type="button"
                            onClick={() => arrayHelpers.push("")}
                            aria-label="Add Reference"
                          >
                            Add Reference
                          </Button>
                        )}
                      </div>
                    )}
                  />
                  {/* Individual Reference Errors */}
                  {errors.references &&
                    Array.isArray(errors.references) &&
                    errors.references.map((error, index) => {
                      return (
                        error && (
                          <p key={index} className="text-red-500 text-sm">
                            {`Reference ${index + 1}: ${error}`}
                          </p>
                        )
                      );
                    })}
                </div>
              </DialogDescription>

              {/* Dialog Footer */}
              <DialogFooter>
                <div className="space-x-2">
                  <Button
                    // className="bg-green-800 hover:bg-green-800/90"
                    type="submit"
                    disabled={false}
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
