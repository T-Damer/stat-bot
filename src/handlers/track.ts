import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'
import { addOrIncrementTrackCategory } from '@/models/User'

export async function addOrIncrementCategory(ctx: Context) {
  if (!ctx.msg?.text) {
    return ctx.replyWithLocalization('errorMessage', sendOptions(ctx))
  }
  const { success } = await addOrIncrementTrackCategory(
    ctx.dbuser.id,
    ctx.msg.text
  )
  if (!success) {
    return ctx.replyWithLocalization('categoryIncremented', sendOptions(ctx))
  } else {
    return ctx.replyWithLocalization('categoryAdded', sendOptions(ctx))
  }
}

export function waitCategory(ctx: Context) {
  return ctx.replyWithLocalization('waitCategory', sendOptions(ctx))
}
