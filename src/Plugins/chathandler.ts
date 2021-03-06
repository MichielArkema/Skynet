import Skynet from "../skynet";
import {Client, Message, User} from "discord.js";
import ChatUtils from "../Utilities/chatutils";
import * as Config from "../config/chathandler.json";
import DataUtils from "../Utilities/datautils";

interface Warning
{
    [key: string] : number
}

//Handles chat messages by checking for spam and badwords
export default class ChatHandler {

    private readonly Client : Client
    private readonly Warnings: Warning = {}

    public constructor() {
        this.Client = Skynet.getInstance().Client;
        this.Client.on('message', (msg) => this.onChatMessage(msg));
        this.Warnings = DataUtils.loadOrCreate("chathandler.json", this.Warnings)
    }

    private onChatMessage(msg: Message) {
        //Let's always check if the sender is not a bot.
        if(!msg.author.bot) {
            const sender = msg.author;
            for(let word of Config.badwords) {
                //if the result is not -1, that means the message contains a bad word.
                if(msg.content.toLowerCase().indexOf(word) != -1) {
                    ChatUtils.sendChannelMessage(Config.messages["badword-detected"].replace("%user%", sender.toString()));
                    sender.send(sender.toString() + Config.messages["message-removed"]);
                    msg.delete();
                    this.giveWarning(sender)
                    break;
                }
            }
        }
    }
    private giveWarning(sender: User) {
        const id = sender.id;
        if(!this.Warnings[id]) {
            this.Warnings[id] = 0;
        }
        this.Warnings[id]++;
    }
}