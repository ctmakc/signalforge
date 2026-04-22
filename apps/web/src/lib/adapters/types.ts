// Platform adapter interface — every adapter must implement this

export type Platform = 'TELEGRAM' | 'REDDIT' | 'X' | 'FACEBOOK' | 'LINKEDIN'

export interface AccountHealth {
  status: 'healthy' | 'at_risk' | 'limited' | 'banned' | 'unknown'
  reputationScore: number
  riskScore: number
  details?: string
}

export interface SourceQuery {
  keyword?: string
  type?: string
  limit?: number
}

export interface SourceResult {
  externalId: string
  name: string
  url?: string
  memberCount?: number
  description?: string
}

export interface RawContentItem {
  externalId: string
  contentType: 'post' | 'comment' | 'message' | 'thread'
  authorName: string
  authorHandle: string
  title?: string
  bodyText: string
  permalink?: string
  postedAt: Date
  metadata?: Record<string, unknown>
}

export interface PublishReplyInput {
  targetRef: string
  text: string
  accountCredentials: Record<string, string>
}

export interface PublishResult {
  success: boolean
  externalId?: string
  error?: string
}

export interface OpenDmInput {
  targetHandle: string
  accountCredentials: Record<string, string>
}

export interface ConversationRef {
  externalConversationId: string
  platform: Platform
}

export interface SendDmInput {
  conversationRef: ConversationRef
  text: string
  accountCredentials: Record<string, string>
}

export interface MessageResult {
  success: boolean
  externalMessageId?: string
  error?: string
}

export interface ConversationData {
  messages: Array<{
    externalId: string
    direction: 'inbound' | 'outbound'
    senderHandle: string
    text: string
    sentAt: Date
  }>
}

export interface Source {
  id: string
  externalSourceId: string | null
  platform: Platform
  url?: string | null
}

export interface PlatformAdapter {
  readonly platform: Platform

  connectAccount(credentials: Record<string, string>): Promise<void>
  disconnectAccount(): Promise<void>
  validateConnection(): Promise<AccountHealth>
  listSources(query: SourceQuery): Promise<SourceResult[]>
  joinSource(externalSourceId: string): Promise<void>
  ingestContent(source: Source): Promise<RawContentItem[]>
  publishReply(input: PublishReplyInput): Promise<PublishResult>
  openDm(input: OpenDmInput): Promise<ConversationRef>
  sendDm(input: SendDmInput): Promise<MessageResult>
  fetchConversation(ref: ConversationRef): Promise<ConversationData>
}
