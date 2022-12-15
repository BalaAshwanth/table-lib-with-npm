import Mustache from "mustache";
import "./styles.scss";

export class UserDefinedTemplate {
    constructor(toBeRendered: Array<object>) {
        this.initTableCreation(toBeRendered)
    }

    initTableCreation(items: Array<object>) {

         const toRender: object = {}
        let allHeaders: Array<string> = [];
        for (const item of items) {
            const keyLength = Object.keys(item)
            if (allHeaders.length < keyLength.length) {
                allHeaders = Object.keys(item)
            }
        }

        const tableHead: Array<string> = [];
        for (const key of allHeaders) {
            tableHead.push(this.capitalize(key))
        }
        const sampleData = []
        for(let i = 0; i < allHeaders.length; i++) {
            sampleData.push("")
        }        
        let count = 0
        for (const item of items) {
            count += 1;
            const data: string[] = JSON.parse(JSON.stringify(sampleData))
            const headers = Object.keys(item);
            for(let i = 0; i < allHeaders.length; i++) {
                const value = headers[i];
                if (allHeaders.includes(value)) {
                    const index = allHeaders.indexOf(headers[i]);
                    data[index] = item[value];
                }
                else {
                    tableHead.push(this.capitalize(value))
                    data.push(item[value]);
                }
            }
            toRender[`item-${count}`] = data
        }
        toRender["header"] = tableHead;
        console.log(toRender);


        const template = this.getTemplete(allHeaders.length)

        const render = Mustache.render(template, toRender)
        document.getElementById("user-defined-table").innerHTML = render;
    }


    capitalize(text: string) {
        const capital = text.charAt(0).toUpperCase();
        const remaining = text.substring(1, text.length)
        const result = capital + remaining;
        return result;
    }

    getTemplete(maxLength: number) {
        let template = `      
        <table>
        <tbody>
          <tr>
            {{#header}}
            <th>{{.}}</th>
            {{/header}}
          </tr>`

        for (let i = 1; i <= maxLength; i++) {
            const body = "item-" + i;
            const templeteToAppend = `  
            <tr>
            {{#${body}}}
            <td>{{.}}</td>
            {{/${body}}}
          </tr>`
            template = template + templeteToAppend;
        }
        const finisher = `
        </tbody>
        </table>
        `
        template += finisher;
        console.log(template);
        return template;
    }
}


const bc = [{
    name: "juba",
    place: "Japan",
    things: "Jet",
    Animals: "Jaguar"
},
{
    name: "Viswa",
    place: "Veitnam",
    things: "Van",
    Animals: "Vagar"
},
{
    name: "Bala Ashwanth",
    place: "Bangladesh",
    things: "Ball",
    Animals: "bat"
},
{
    name: "Jagan",
    place: "jamaica",
    age: 21,
    Animals: "Jagan",
    
}]
const a = new UserDefinedTemplate(bc)


