import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const validationSchema = Yup.object().shape({
  homeOgTags: Yup.object().shape({
    title: Yup.string(),
    description: Yup.string(),
    image: Yup.string().url(),
    url: Yup.string().url(),
  }),
});

type InitialValues = {
  homeOgTags: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
};

const initialValues: InitialValues = {
  homeOgTags: {
    title: "",
    description: "",
    image: "",
    url: "",
  },
};

export default function HomeOpenGraphForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Submitting Open Graph Tags:", values.homeOgTags);
        alert("Open Graph Tags submitted successfully!");
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Home Page Open Graph Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="homeOgTags.title">OG Title</Label>
                  <Field
                    as={Input}
                    id="homeOgTags.title"
                    name="homeOgTags.title"
                    className="w-full"
                  />
                  {touched.homeOgTags?.title && errors.homeOgTags?.title && (
                    <p className="text-red-500 text-sm">
                      {errors.homeOgTags.title}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="homeOgTags.description">OG Description</Label>
                  <Field
                    as={Textarea}
                    id="homeOgTags.description"
                    name="homeOgTags.description"
                    className="w-full"
                  />
                  {touched.homeOgTags?.description &&
                    errors.homeOgTags?.description && (
                      <p className="text-red-500 text-sm">
                        {errors.homeOgTags.description}
                      </p>
                    )}
                </div>
                <div>
                  <Label htmlFor="homeOgTags.image">OG Image URL</Label>
                  <Field
                    as={Input}
                    id="homeOgTags.image"
                    name="homeOgTags.image"
                    className="w-full"
                  />
                  {touched.homeOgTags?.image && errors.homeOgTags?.image && (
                    <p className="text-red-500 text-sm">
                      {errors.homeOgTags.image}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="homeOgTags.url">OG URL</Label>
                  <Field
                    as={Input}
                    id="homeOgTags.url"
                    name="homeOgTags.url"
                    className="w-full"
                  />
                  {touched.homeOgTags?.url && errors.homeOgTags?.url && (
                    <p className="text-red-500 text-sm">
                      {errors.homeOgTags.url}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <Button type="submit" disabled={isSubmitting}>
            Save Open Graph Tags
          </Button>
        </Form>
      )}
    </Formik>
  );
}
