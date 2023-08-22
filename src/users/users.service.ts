import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;


@Injectable()
export class UsersService {


    private readonly APIkeys = [
        "key1",
        "YOUR_SECRET_API_KEY"
    ]

    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async checkAPIKey(apikey: string): Promise<boolean> {

        return this.APIkeys.includes(apikey);
    }

}