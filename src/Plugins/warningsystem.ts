
import Discord, {MessageEmbed, TextChannel} from "discord.js";
import Skynet from "../skynet";
import ChatUtils from "../Utilities/chatutils";
import DataUtils from "../Utilities/datautils";

export default class WarningSystem
{
    public providers: WarningProvider[] = []

    private client: Discord.Client;

    public constructor() {
        //Declare fields.
        this.client = Skynet.getInstance().Client;
        this.providers = DataUtils.loadOrCreate("warningsystem.data.json", this.providers)

        //Register hooks
        this.client.on('message',  (msg) => this.onChatMessage(msg))
    }
    private onChatMessage(msg: Discord.Message) {
        const sender = msg.author;
        if(!sender.bot && ChatUtils.isBotChannel(msg.channel.id) && ChatUtils.isCommand(msg)) {
            const command = ChatUtils.parseCommand(msg);

            if(command?.cmd == "warn")
            {
                const args = command.args;
                if(args.length == 0) {
                    this.sendHelpMessage(msg.channel as TextChannel);
                }
                else
                {
                    //todo: Add support for commands.
                }
            }
        }
    }

    private sendHelpMessage(channel: TextChannel) {
        const message = new MessageEmbed()
            .setTitle("Warning Help")
            .setDescription("WarningSystem help list.")
            .addField("Help List:", "Dummy test. Ignore this.")

        channel.send(message);
    }
}

class WarningProvider
{
    public name: string
    public warnings: Warning[]

    public constructor(name:string) {
        this.name = name;
        this.warnings = [];
    }
}
class Warning{
    //The id of the user.
    public id: string
    //The amount of warnings.
    public amount: number

    public constructor(id:string) {
        this.id = id;
        this.amount = 0;
    }
}