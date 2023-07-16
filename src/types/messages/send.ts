export type BrazeSendMessageResponse = {
  message?: string;
};

export type BrazeSendMessageRequest = {
  // You will need to include at least one of 'segment_id', 'external_user_ids', and 'audience'
  // Including 'segment_id' will send to members of that segment
  // Including 'external_user_ids' and/or 'user_aliases' will send to those users
  // Including both will send to the provided users if they are in the segment

  // (optional, boolean) see broadcast -- defaults to false on 8/31/17, must be set to true if no external_user_ids or aliases are provided,
  broadcast?: boolean;
  // (optional, array of strings) see external user identifier,
  external_user_ids?: string[];

  // (optional, array of user alias object) see user alias,
  user_aliases?: unknown[];

  // (optional, string) see segment identifier,
  segment_id?: string;

  // (optional, connected audience object) see connected audience,
  audience?: unknown;

  // (optional*, string) *required if you wish to track campaign stats (e.g., sends, clicks, bounces, etc). see campaign identifier,
  campaign_id?: string;

  // (optional, string) see send identifier,
  send_id?: string;

  // (optional, bool) ignore frequency_capping for campaigns, defaults to false,
  override_frequency_capping?: boolean;

  // (optional, string) use this to send messages to only users who have opted in ('opted_in'), only users who have subscribed or are opted in ('subscribed') or to all users, including unsubscribed users ('all'), the latter being useful for transactional email messaging. Defaults to 'subscribed',
  recipient_subscription_state?: string;
  messages: {
    // (optional, apple push object),
    apple_push?: unknown;

    // (optional, android push object),
    android_push?: unknown;

    // (optional, kindle/fireOS push object),
    kindle_push?: unknown;

    // (optional, web push object),
    web_push?: unknown;

    // (optional, email object),
    email?: BrazeEmailObject;

    // (optional, webhook object),
    webhook?: unknown;

    // (optional, content card object),
    content_card?: unknown;

    // (optional, SMS object),
    sms?: unknown;

    // (optional, WhatsApp object)
    whats_app?: unknown;
  };
};

type FromEmailAddress = `Display Name <${string}>`;


export type BrazeEmailObject = {
  // (required, string), see App Identifier,
  app_id: string;

  // (optional, string),
  subject?: string;

  // (required, valid email address in the format "Display Name <email@address.com>"),
  from: FromEmailAddress;

  // (optional, valid email address in the format "email@address.com" - defaults to your workspace's default reply to if not set) - use "NO_REPLY_TO" to set reply-to address to null,
  reply_to?: string;

  // (optional, one of the BCC addresses defined in your workspace's email settings) if provided and the BCC feature is enabled for your account, this address will get added to your outbound message as a BCC address,
  bcc?: string;

  // (required unless email_template_id is given, valid HTML),
  body?: string;
  // (optional, valid plaintext, defaults to autogenerating plaintext from "body" when this is not set),
  plaintext_body?: string;

  // (optional*, string) recommended length 50-100 characters,
  preheader?: string;

  // (optional, string) if provided, we will use the subject/body/should_inline_css values from the given email template UNLESS they are specified here, in which case we will override the provided template,
  email_template_id?: string;

  // (optional, string) used when providing a campaign_id to specify which message variation this message should be tracked under,
  message_variation_id?: string;

  // (optional, valid Key-Value Hash) extra hash - for SendGrid users, this will be passed to SendGrid as Unique Arguments,
  extras?: { [key: string]: string };

  // (optional, valid Key-Value Hash) hash of custom extensions headers (available for SparkPost and SendGrid),
  headers?: { [key: string]: string };

  // (optional, boolean) whether to inline CSS on the body. If not provided, falls back to the default CSS inlining value for the workspace,
  should_inline_css?: boolean;

  // (optional, array) array of JSON objects that define the files you need attached, defined by "file_name" and "url",
  attachments?: object[];

  // (required, string) the name of the file you would like to attach to your email, excluding the extension (e.g., ".pdf"). You can attach any number of files up to 2 MB. This is required if you use "attachments",
  file_name?: string;

  // (required, string) the corresponding URL of the file you would like to attach to your email. The file name's extension will be detected automatically from the URL defined, which should return the appropriate "Content-Type" as a response header. This is required if you use "attachments",
  url?: string;
};
