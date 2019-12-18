import User from "./../modules/user/user.model";
import connections from "./../utils/connections";

const connection = connections('graphql')

const initializeTable = (): Promise<any> => new Promise<any>(async (resolve, reject) => {
    try {
        await User.sync({
            force: true,
        });
        global.logger.info('Table user has been synced');
        resolve(true)
    } catch (error) {
        reject(error)        
    }
})

export {
    connection,
    initializeTable,
    User
}