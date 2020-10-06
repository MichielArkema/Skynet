import * as fs from "fs";
import  * as path from "path";

export default class DataUtils
{
    public static loadOrCreate(name:string, data: object)
    {
        if(!name || !data)
            return {};
        const file_path = path.join("./src/data", name);
        if(fs.existsSync(file_path)) {
            const contents = fs.readFileSync(file_path).toString();
            return JSON.parse(contents);
        }
        else
        {
            const contents = JSON.stringify(data);
            fs.writeFileSync(file_path, contents);
            return data;
        }
    }

    private static saveData(name: string, data: object) {
        if(!name || !data)
            return;
        const file_path = path.join("../data", name);

        const contents = JSON.stringify(data);
        fs.writeFileSync(file_path, contents);
    }
}