import { OutgoingMessage } from "./types";
import { User } from "./User";

export class RoomManager {
  rooms: Map<string, User[]> = new Map();
  static instance: RoomManager;

  private constructor() {
    this.rooms = new Map();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new RoomManager();
    }
    return this.instance;
  }

  //removes a user from a space
  public removeUser(user: User, spaceId: string) {
    if (!this.rooms.has(spaceId)) {
      return;
    }
    this.rooms.set(
      spaceId,
      this.rooms.get(spaceId)?.filter((u) => u.id !== user.id) ?? []
    );
  }

  //adds a user to space room if the room doest exist it created it first
  public addUser(spaceId: string, user: User) {
    if (!this.rooms.has(spaceId)) {
      this.rooms.set(spaceId, [user]);
      return;
    }
    this.rooms.set(spaceId, [...(this.rooms.get(spaceId) ?? []), user]);
  }


//sends a message to every user inthe room except the sender
  public broadcast(message: OutgoingMessage, user: User, roomId: string) {
    if (!this.rooms.has(roomId)) {
      return;
    }

    this.rooms.get(roomId)?.forEach((u) => {
      if (u.id !== user.id) {
        u.send(message);
      }
    });
  }
}
