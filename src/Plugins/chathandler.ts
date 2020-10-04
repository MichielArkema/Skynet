import Skynet from "../skynet";
import {Client, Message} from "discord.js";
import ChatUtils from "../Utilities/chatutils";
import * as Config from "../config.json";

export default class ChatHandler {
    private Client : Client

    public constructor() {
        this.Client = Skynet.getInstance().Client;
        this.Client.on('message', (msg) => this.onChatMessage(msg));
    }

    private onChatMessage(msg: Message) {
        if(!msg.author.bot) {
            if(ChatUtils.isBotChannel(msg.channel.id)) {

            }
        }
    }
}