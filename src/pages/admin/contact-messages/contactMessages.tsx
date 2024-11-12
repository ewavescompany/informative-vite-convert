import withAuth from "@/hocs/withAuth";
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import PageLoader from "@/customComponents/pageLoader";
import useFetchContactMessages from "@/hooks/dashboard/useFetchContactMessages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactInfo } from "@/interfaces/dashboardInterface";
import { useTranslation } from "react-i18next";

function ContactMessagesPage() {
  const { t } = useTranslation();
  const { messages, loading, error } = useFetchContactMessages();

  if (loading) return <PageLoader />; // Show loader while fetching data
  if (error)
    return (
      <div>
        {t("messages.error")}: {error}
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <DashboardTitle title={t("messages.contact_us_messages")} />
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>{t("messages.messages")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("messages.name")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("messages.email")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("messages.message")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("messages.date")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {messages?.map((message: ContactInfo, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {/* {message.} */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {message.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {/* {message.} */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(message.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(ContactMessagesPage);
