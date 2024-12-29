import { messageInterface } from "./messagesInterface";

const handleServerResponse = (result: any): messageInterface => {
  const responseTypes: Record<string, string> = {
    help: "string",
    google_malware: "string",
    google_index: "string",
    md5: "string",
    error: "string",
    sitemap: "sitemap",
    backlink: "backlink",
    hostinfo: "hostinfo",
    meta_gen: "meta_gen",
    keywords_suggest: "keywords_suggest",
    link_analyzer: "link_analyzer",
    page_speed: "page_speed",
    broken_links: "broken_links",
    meta_checker: "meta_checker",
    create_article: "create_article",
    domain_suggest: "domain_suggest",
    google_cache: "string",
    whois: "whois",
    ssl_checker: "ssl_checker",
  };

  // Cast result.result.bot.type as keyof typeof responseTypes to ensure it's a valid key
  const type =
    responseTypes[result.result.bot.type as keyof typeof responseTypes] ||
    "unknown";

  console.log(result);
  return {
    message: result.result.bot.response || result.result.bot.error,
    senderId: 0,
    type,
  };
};

export default handleServerResponse;
