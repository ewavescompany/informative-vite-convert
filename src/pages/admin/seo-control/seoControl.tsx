import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MetaTagsForm from "./form";

export default function MetaTagsPage() {
  return (
    <Card className="container mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          # Meta Tags Manager
        </CardTitle>
        <CardDescription># description</CardDescription>
      </CardHeader>
      <CardContent>
        <MetaTagsForm />
      </CardContent>
    </Card>
  );
}
