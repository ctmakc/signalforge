import { redditRequest } from './reddit-auth'
import type {
  PlatformAdapter, AccountHealth, SourceQuery, SourceResult,
  RawContentItem, PublishReplyInput, PublishResult,
  OpenDmInput, ConversationRef, SendDmInput, MessageResult, ConversationData, Source,
} from './types'

function decodeCredentials(enc: string) {
  return JSON.parse(Buffer.from(enc, 'base64').toString('utf8')) as {
    username: string; password: string; clientId: string; clientSecret: string
  }
}

export class RedditAdapter implements PlatformAdapter {
  readonly platform = 'REDDIT' as const
  private encryptedCredentials: string
  private accessToken: string

  constructor(encryptedCredentials: string, accessToken: string) {
    this.encryptedCredentials = encryptedCredentials
    this.accessToken = accessToken
  }

  private get username() {
    return decodeCredentials(this.encryptedCredentials).username
  }

  private api(path: string, opts?: { method?: string; body?: Record<string, string> }) {
    return redditRequest({
      accessToken: this.accessToken,
      path,
      userAgent: `SignalForge/1.0 by ${this.username}`,
      ...opts,
    })
  }

  async connectAccount(_credentials: Record<string, string>): Promise<void> {}
  async disconnectAccount(): Promise<void> {}

  async validateConnection(): Promise<AccountHealth> {
    try {
      const me = await this.api('/api/v1/me') as { name: string; link_karma: number; comment_karma: number; is_suspended: boolean }
      const karma = (me.link_karma ?? 0) + (me.comment_karma ?? 0)
      return {
        status: 'healthy',
        reputationScore: Math.min(100, Math.floor(karma / 100)),
        riskScore: me.is_suspended ? 80 : 0,
        details: `u/${me.name} · ${karma} karma`,
      }
    } catch (err) {
      return { status: 'unknown', reputationScore: 0, riskScore: 100, details: String(err) }
    }
  }

  async listSources(query: SourceQuery): Promise<SourceResult[]> {
    const data = await this.api(`/subreddits/search?q=${encodeURIComponent(query.keyword ?? '')}&limit=10`) as {
      data: { children: Array<{ data: { name: string; display_name: string; subscribers: number; public_description: string } }> }
    }
    return data.data.children.map((c) => ({
      externalId: c.data.name,
      name: `r/${c.data.display_name}`,
      memberCount: c.data.subscribers ?? 0,
      description: c.data.public_description ?? '',
    }))
  }

  async joinSource(externalSourceId: string): Promise<void> {
    await this.api('/api/subscribe', { method: 'POST', body: { action: 'sub', sr: externalSourceId } })
  }

  async ingestContent(source: Source): Promise<RawContentItem[]> {
    const subreddit = source.externalSourceId ?? ''
    const data = await this.api(`/r/${subreddit}/new?limit=25`) as {
      data: { children: Array<{ data: { id: string; author: string; title: string; selftext: string; permalink: string; created_utc: number; score: number; num_comments: number } }> }
    }
    return data.data.children.map((c) => ({
      externalId: c.data.id,
      contentType: 'post' as const,
      authorName: c.data.author,
      authorHandle: c.data.author,
      title: c.data.title,
      bodyText: c.data.selftext ?? '',
      permalink: `https://reddit.com${c.data.permalink}`,
      postedAt: new Date(c.data.created_utc * 1000),
      metadata: { score: c.data.score, numComments: c.data.num_comments },
    }))
  }

  async publishReply(input: PublishReplyInput): Promise<PublishResult> {
    try {
      await this.api('/api/comment', {
        method: 'POST',
        body: { thing_id: `t3_${input.targetRef}`, text: input.text },
      })
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : String(err) }
    }
  }

  async openDm(input: OpenDmInput): Promise<ConversationRef> {
    await this.api('/api/compose', {
      method: 'POST',
      body: { to: input.targetHandle, subject: 'Hey', text: '' },
    })
    return { externalConversationId: `dm:${input.targetHandle}`, platform: 'REDDIT' }
  }

  async sendDm(input: SendDmInput): Promise<MessageResult> {
    try {
      const username = input.conversationRef.externalConversationId.replace('dm:', '')
      await this.api('/api/compose', {
        method: 'POST',
        body: { to: username, subject: 'Follow-up', text: input.text },
      })
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : String(err) }
    }
  }

  async fetchConversation(_ref: ConversationRef): Promise<ConversationData> {
    return { messages: [] }
  }

  async upvoteRandom(subreddit: string): Promise<void> {
    const data = await this.api(`/r/${subreddit}/hot?limit=10`) as {
      data: { children: Array<{ data: { name: string } }> }
    }
    const posts = data.data.children
    const post = posts[Math.floor(Math.random() * posts.length)]
    if (post) {
      await this.api('/api/vote', { method: 'POST', body: { id: post.data.name, dir: '1' } })
    }
  }

  async commentOnPost(postId: string, text: string): Promise<void> {
    await this.api('/api/comment', { method: 'POST', body: { thing_id: `t3_${postId}`, text } })
  }
}
