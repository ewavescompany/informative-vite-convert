"use client";

import { useState } from "react";
import withAuth from "@/hocs/withAuth";
import { DashboardTitle } from "@/customComponents/dashboardComponent/tags/dashboardTitle";
import PageLoader from "@/customComponents/pageLoader";
import useFetchContactMessages from "@/hooks/dashboard/useFetchContactMessages";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactInfo } from "@/interfaces/dashboardInterface";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function ContactMessagesPage() {
  const { t } = useTranslation();
  const { messages, loading, error } = useFetchContactMessages();
  const [selectedMessage, setSelectedMessage] = useState<ContactInfo | null>(
    null
  );
  const [messageToDelete, setMessageToDelete] = useState<ContactInfo | null>(
    null
  );

  if (loading) return <PageLoader />;

  if (error)
    return (
      <div>
        {t("messages.error")}: {error}
      </div>
    );

  const handleDelete = (message: ContactInfo) => {
    setMessageToDelete(message);
  };

  const confirmDelete = () => {
    if (messageToDelete) {
      // Implement delete functionality here
      console.log(`Delete message with id: ${messageToDelete.id}`);
      setMessageToDelete(null);
    }
  };

  const handleShowMore = (message: ContactInfo) => {
    setSelectedMessage(message);
  };

  return (
    <div className="w-full flex flex-col gap-5 capitalize">
      <DashboardTitle title={t("messages.contact_us_messages")} />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t("messages.messages")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="md:table-cell">
                    {t("messages.name")}
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    {t("messages.email")}
                  </TableHead>
                  <TableHead>{t("messages.message")}</TableHead>
                  <TableHead className="hidden md:table-cell">
                    {t("messages.date")}
                  </TableHead>
                  <TableHead>{t("messages.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages?.reverse().map((message: ContactInfo) => (
                  <TableRow key={message.id}>
                    <TableCell className="md:table-cell">
                      {message.full_name}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {message.email}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {message.message}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(message.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleShowMore(message)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(message)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedMessage}
        onOpenChange={() => setSelectedMessage(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("messages.message_details")}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="space-y-2">
              <p>
                <strong>{t("messages.name")}:</strong>{" "}
                {selectedMessage?.full_name}
              </p>
              <p>
                <strong>{t("messages.email")}:</strong> {selectedMessage?.email}
              </p>
              <p>
                <strong>{t("messages.date")}:</strong>{" "}
                {selectedMessage &&
                  new Date(selectedMessage.created_at).toLocaleString()}
              </p>
              <p>
                <strong>{t("messages.subject")}:</strong>{" "}
                {selectedMessage?.subject}
              </p>
              <p>
                <strong>{t("messages.message")}:</strong>
              </p>
              <p className="whitespace-pre-wrap">{selectedMessage?.message}</p>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!messageToDelete}
        onOpenChange={() => setMessageToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("messages.confirm_deletion")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("messages.delete_confirmation", {
                name: messageToDelete?.full_name,
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              {t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default withAuth(ContactMessagesPage);
