import User from "./user.model"
import bcryptjs from 'bcryptjs';


export interface IUser {
    id?: number

    name: string

    username: string | null

    email: string

    password?: string | null

    birthdate?: Date | null

    phone?: string | null

    telephone?: string | null

    rememberToken?: string | null

    verificationDate?: Date | null

    createdDate?: Date | null

    createdId?: number | null

    updatedDate?: Date | null

    updatedId?: number | null

    facebookId?: bigint | null

    githubId?: bigint | null

    googleId?: bigint | null

    linkedinId?: bigint | null

    twitterId?: bigint | null
}

export default class UserService {
    create = (args:IUser): Promise<any> => new Promise<User>(async (resolve, reject) => {
        try {
            if(await User.count({
                where: {
                    email: args.email
                }
            }) <= 0 ) {
                if(await User.count({
                    where: {
                        username: args.username
                    }
                }) <= 0 ) {
                    const user = await User.create({
                        ...args,
                        password: await bcryptjs.hashSync(args.password, await bcryptjs.genSaltSync(10)),
                        birthdate: Date.parse(args.birthdate.toString() + ' 00:00:00')
                    })
                    resolve(user)
                }else{
                    reject(new Error('Username already exist'))
                }
            }else{
                reject(new Error('Email already exist'))
            }
        } catch (error) {
            reject(error)
        }
    })
}