import { Formik, Form, Field, FieldArray, getIn } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const pages = [
  "home",
  "about-us",
  "contact-us",
  "portfolio",
  "services",
  "blogs",
];

const validationSchema = Yup.object().shape({
  pages: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      keywords: Yup.array().of(Yup.string()),
    })
  ),
});

type Page = {
  name: string;
  description: string;
  keywords: string[];
};

type InitialValues = {
  pages: Page[];
};

const initialValues: InitialValues = {
  pages: pages.map((page) => ({ name: page, description: "", keywords: [] })),
};

export default function SeoInputsForm() {
  const [inputValues, setInputValues] = useState<Record<string, string>>(
    pages.reduce((acc, page) => {
      acc[page] = "";
      return acc;
    }, {} as Record<string, string>)
  );

  return (
    <Formik<InitialValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={(values) => {
        console.log("Submitting values:", values);
        alert("Form submitted successfully!");
      }}
    >
      {({ values, errors, touched, setFieldValue, isSubmitting }) => (
        <Form className="space-y-8">
          <FieldArray name="pages">
            {() => (
              <div className="grid grid-cols-2 gap-4">
                {values.pages.map((page, index) => {
                  // Use getIn to safely access nested errors and touched properties
                  const descriptionError = getIn(
                    errors,
                    `pages.${index}.description`
                  );
                  const descriptionTouched = getIn(
                    touched,
                    `pages.${index}.description`
                  );

                  const keywordsError = getIn(
                    errors,
                    `pages.${index}.keywords`
                  );
                  const keywordsTouched = getIn(
                    touched,
                    `pages.${index}.keywords`
                  );

                  return (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-bold">
                          {page.name.charAt(0).toUpperCase() +
                            page.name.slice(1)}{" "}
                          Page
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <Label htmlFor={`pages.${index}.description`}>
                              Description
                            </Label>
                            <Field
                              as={Textarea}
                              id={`pages.${index}.description`}
                              name={`pages.${index}.description`}
                              className="w-full"
                            />
                            {descriptionTouched && descriptionError && (
                              <p className="text-red-500 text-sm">
                                {descriptionError}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor={`pages.${index}.keywords`}>
                              Keywords
                            </Label>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {page.keywords.map((tag, tagIndex) => (
                                <div
                                  key={tagIndex}
                                  className="bg-primary text-primary-foreground px-2 py-1 rounded-md flex items-center"
                                >
                                  <span>{tag}</span>
                                  <Button
                                    size="sm"
                                    type="button"
                                    onClick={() => {
                                      const newKeywords = [...page.keywords];
                                      newKeywords.splice(tagIndex, 1);
                                      setFieldValue(
                                        `pages.${index}.keywords`,
                                        newKeywords
                                      );
                                    }}
                                    className="m-0 p-0 mx-2 text-primary-foreground hover:text-red-500"
                                  >
                                    <X size={14} />
                                  </Button>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                value={inputValues[page.name]}
                                onChange={(e) =>
                                  setInputValues({
                                    ...inputValues,
                                    [page.name]: e.target.value,
                                  })
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    const tag = inputValues[page.name].trim();
                                    if (tag && !page.keywords.includes(tag)) {
                                      setFieldValue(`pages.${index}.keywords`, [
                                        ...page.keywords,
                                        tag,
                                      ]);
                                      setInputValues({
                                        ...inputValues,
                                        [page.name]: "",
                                      });
                                    }
                                  }
                                }}
                                className="flex-grow"
                                placeholder="Type a keyword and press Enter"
                              />
                              <Button
                                type="button"
                                onClick={() => {
                                  const tag = inputValues[page.name].trim();
                                  if (tag && !page.keywords.includes(tag)) {
                                    setFieldValue(`pages.${index}.keywords`, [
                                      ...page.keywords,
                                      tag,
                                    ]);
                                    setInputValues({
                                      ...inputValues,
                                      [page.name]: "",
                                    });
                                  }
                                }}
                              >
                                Add Tag
                              </Button>
                            </div>
                            {keywordsTouched && keywordsError && (
                              <p className="text-red-500 text-sm">
                                {keywordsError}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </FieldArray>
          <Button type="submit" disabled={isSubmitting}>
            Save SEO Inputs
          </Button>
        </Form>
      )}
    </Formik>
  );
}
