// TelegramAdapter — scaffold (real Telegraf integration in Phase 4)
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

export class TelegramAdapter implements PlatformAdapter {
  readonly platform = 'TELEGRAM' as const

  async connectAccount(_credentials: Record<string, string>): Promise<void> {
    throw new Error('TelegramAdapter.connectAccount not implemented')
  }

  async disconnectAccount(): Promise<void> {
    throw new Error('TelegramAdapter.disconnectAccount not implemented')
  }

  async validateConnection(): Promise<AccountHealth> {
    return { status: 'unknown', reputationScore: 0, riskScore: 0 }
  }

  async listSources(_query: SourceQuery): Promise<SourceResult[]> {
    return []
  }

  async joinSource(_externalSourceId: string): Promise<void> {
    throw new Error('TelegramAdapter.joinSource not implemented')
  }

  async ingestContent(_source: Source): Promise<RawContentItem[]> {
    return []
  }

  async publishReply(_input: PublishReplyInput): Promise<PublishResult> {
    return { success: false, error: 'TelegramAdapter.publishReply not implemented' }
  }

  async openDm(_input: OpenDmInput): Promise<ConversationRef> {
    throw new Error('TelegramAdapter.openDm not implemented')
  }

  async sendDm(_input: SendDmInput): Promise<MessageResult> {
    return { success: false, error: 'TelegramAdapter.sendDm not implemented' }
  }

  async fetchConversation(_ref: ConversationRef): Promise<ConversationData> {
    return { messages: [] }
  }
}
