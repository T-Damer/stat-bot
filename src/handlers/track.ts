import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default function handleTrack(ctx: Context) {
  return ctx.replyWithLocalization('track', sendOptions(ctx))
}
