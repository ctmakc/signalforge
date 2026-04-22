// RedditAdapter — scaffold (real PRAW/snoowrap integration in Phase 4)
import type {
  PlatformAdapter,
  AccountHealth,
  SourceQuery,
  SourceResult,
  RawContentItem,
  PublishReplyInput,
  PublishResult,
  OpenDmInput,
  ConversationRef,
  SendDmInput,
  MessageResult,
  ConversationData,
  Source,
} from './types'

export class RedditAdapter implements PlatformAdapter {
  readonly platform = 'REDDIT' as const

  async connectAccount(_credentials: Record<string, string>): Promise<void> {
    throw new Error('RedditAdapter.connectAccount not implemented')
  }

  async disconnectAccount(): Promise<void> {
    throw new Error('RedditAdapter.disconnectAccount not implemented')
  }

  async validateConnection(): Promise<AccountHealth> {
    return { status: 'unknown', reputationScore: 0, riskScore: 0 }
  }

  async listSources(_query: SourceQuery): Promise<SourceResult[]> {
    return []
  }

  async joinSource(_externalSourceId: string): Promise<void> {
    throw new Error('RedditAdapter.joinSource not implemented')
  }

  async ingestContent(_source: Source): Promise<RawContentItem[]> {
    return []
  }

  async publishReply(_input: PublishReplyInput): Promise<PublishResult> {
    return { success: false, error: 'RedditAdapter.publishReply not implemented' }
  }

  async openDm(_input: OpenDmInput): Promise<ConversationRef> {
    throw new Error('RedditAdapter.openDm not implemented')
  }

  async sendDm(_input: SendDmInput): Promise<MessageResult> {
    return { success: false, error: 'RedditAdapter.sendDm not implemented' }
  }

  async fetchConversation(_ref: ConversationRef): Promise<ConversationData> {
    return { messages: [] }
  }
}
