import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import Track from '@/models/Track'

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @prop({ required: true, index: true, unique: true })
  id!: number
  @prop({ required: true, default: 'en' })
  language!: string
  @prop({ index: true, unique: true, default: {} })
  track!: Track
}

export const UserModel = getModelForClass(User)

export function findOrCreateUser(id: number) {
  return UserModel.findOneAndUpdate(
    { id },
    {},
    {
      upsert: true,
      new: true,
    }
  )
}

export async function addOrIncrementTrackCategory(
  userId: number,
  category: string
) {
  const user = await findOrCreateUser(userId)
  if (user.track[category] !== undefined) {
    await UserModel.updateOne(
      { id: userId },
      { $set: { [`track.${category}`]: user.track[category] + 1 } }
    )
    return { success: false }
  }
  await UserModel.updateOne(
    { id: userId },
    { $set: { [`track.${category}`]: 0 } }
  )
  return { success: true }
}
