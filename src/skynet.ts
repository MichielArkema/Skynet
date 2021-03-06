import Discord from "discord.js";
import {BOT_TOKEN} from "./credentials";
import About from "./Plugins/about";
import ChatHandler from "./Plugins/chathandler"
import WarningSystem from "./Plugins/warningsystem";

/*
   This is the bootstrapper and the main component of the discord bot.
   Accessing Skynet components should always be done trough here.
 */
export default class Skynet {
    private static _instance: Skynet

    //Fields

    public Client:Discord.Client

    //Plugin instances.
    // @ts-ignore
    public Chathandler : ChatHandler

    // @ts-ignore
    public About : About

    // @ts-ignore
    public WarningSystem : WarningSystem

    public static getInstance() : Skynet {
        if(this._instance == null)
            this._instance = new Skynet();
        return this._instance;
    }

    public start() :void {
        this.Client.login(BOT_TOKEN).then((msg) => {
            console.log("Response: " + msg);
        });
        this.Chathandler = new ChatHandler();
        this.About = new About();
        this.WarningSystem = new WarningSystem();
    }


    private constructor() {
        this.Client = new Discord.Client();
    }
}

Skynet.getInstance().start();
