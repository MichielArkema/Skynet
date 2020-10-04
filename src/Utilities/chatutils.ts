import {BOT_CHANNEL_ID} from "../credentials";
import {Message, TextChannel} from "discord.js";
import * as Config from "../config.json";
import Skynet from "../skynet";

export default class ChatUtils {

    // @ts-ignore
    //Send a chat message to the bot channel.
    public static async sendChannelMessage(message: string) {
        const channel = Skynet.getInstance().Client.channels.cache.find(x => x.id == BOT_CHANNEL_ID) as TextChannel;
        await channel.send(message);
    }
    public static isBotChannel(channelId: string) : boolean
    {
        if(channelId == BOT_CHANNEL_ID)
        {
            return true;
        }
        this.sendChannelMessage(Config.messages.warning.BOT_CHANNEL_ONLY)
        return false;
    }


    public static isCommand(message: Message) : boolean {
        return message.content.substring(0, 1) == Config.options.COMMAND_MODIFIER;
    }

    public static parseCommand(message: Message) {
        try
        {
            const content = message.content.replace(Config.options.COMMAND_MODIFIER, "").split(" ");
            const command = content[0];
            const args = ChatUtils.parseArguments(content);
            return {
                "cmd": command,
                "args": args
            }
        }
        catch (e) {
            console.error("An exception has thrown while trying to parse a command. Error: " + e.message)
            return null;
        }
    }
    private static parseArguments(content: string[]) {
        const args : string[] = [];
        for(let i = 1; i < content.length; i++) {
            args.push(content[i]);
        }
        return args;
    }
}