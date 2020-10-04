import {Client, Message} from "discord.js";
import Skynet from "../skynet";
import ChatUtils from "../Utilities/chatutils";

//
export default class About
{
    private Client : Client

    public constructor() {
        this.Client = Skynet.getInstance().Client;
        this.Client.on('message', (msg) => this.onChatMessage(msg));
    }

    private onChatMessage(msg: Message) {
        if(!msg.author.bot) {
            if(ChatUtils.isCommand(msg)) {
                const command = ChatUtils.parseCommand(msg);
                if(command?.cmd == "about") {
                    ChatUtils.sendChannelMessage(msg.author.toString() + " The Skynet bot is created by Michiel Arkema.")
                }
            }
        }
    }
}

