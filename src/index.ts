import Mustache from "mustache";
import "./styles.scss";

export class UserDefinedTemplate {
    constructor(toBeRendered: object) {
        this.initTableCreation(toBeRendered)
    }

    initTableCreation(items: object) {
        const tableHead = Object.keys(items)
        const tableBody = Object.values(items)
        const toRender: object = {}
        toRender["header"] = tableHead;
        console.log(tableBody)
        let maxLength = 0
        for (const item of tableBody) {
            if (maxLength < item.length) {
                maxLength = item.length
            }
        }

        for (let i = 0; i < maxLength; i++) {
            const data: Array<string> = [];
            for (const item of tableBody) {
                if (item[i] != null) {
                    data.push(item[i])
                }
                else {
                    data.push("")
                }
            }
            toRender["item-" + (i + 1)] = data
        }

        const template = this.getTemplete(maxLength)

        const render = Mustache.render(template, toRender)
        document.getElementById("user-defined-table").innerHTML = render;

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

const a = new UserDefinedTemplate({
    Name: ["juba", "Viswa", "Bala Ashwanth", "Jagan"],
    Place: ["Japan", "Veitnam", "Bangladesh", "jamaica"],
    Things: ["Jet", "Van", "Ball", ""],
    Animals: ["Jaguar", "Vagar", "bat", "Jagan"]
})


