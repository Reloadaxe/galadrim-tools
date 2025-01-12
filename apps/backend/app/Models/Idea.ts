import { IIdea } from '@galadrim-tools/shared'
import {
    BaseModel,
    beforeFetch,
    column,
    HasMany,
    hasMany,
    ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import IdeaVote from '../../app/Models/IdeaVote'
import IdeaComment from './IdeaComment'

export default class Idea extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public userId: number

    @column()
    public text: string

    @column()
    public isAnonymous: boolean

    @column()
    public state: IIdea['state']

    @hasMany(() => IdeaVote)
    public ideaVotes: HasMany<typeof IdeaVote>

    @hasMany(() => IdeaComment)
    public ideaComments: HasMany<typeof IdeaComment>

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @beforeFetch()
    public static autoLoadParameters(query: ModelQueryBuilderContract<typeof Idea>) {
        query.preload('ideaVotes')
        query.preload('ideaComments')
    }

    public isOwner(userId: number) {
        return this.userId === userId
    }

    get frontendData(): IIdea {
        return {
            id: this.id,
            createdBy: this.isAnonymous ? undefined : this.userId,
            text: this.text,
            reactions: this.ideaVotes.map((ideaVote) => ideaVote.frontendData),
            comments: this.ideaComments.map((ideaComment) => ideaComment.frontendData),
            createdAt: this.createdAt.toJSDate(),
            state: this.state,
            isOwner: false,
        }
    }

    public getUserFrontendData(userId: number): IIdea {
        return {
            ...this.frontendData,
            isOwner: this.isOwner(userId),
        }
    }
}
