import Dexie from "dexie";
import { LocalUserImage } from "./local-user-image-model";
import { from } from "rxjs";

export class LocalDb {
    private localD = new Dexie("whats-local");
    private get userTable() {
        return this.localD.table<LocalUserImage>("users");
    }

    constructor() {
        this.localD.version(1)
        .stores({
            users: "&id, name, imageBlob"
        });
    }

    addUser(users: LocalUserImage[]) {
        return from(this.userTable.bulkPut(users));
    }
}