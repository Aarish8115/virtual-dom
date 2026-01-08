
import data from "./main.json" with { type: "json" };

console.log(data);
const createNode=(tagname,attributes,children)=>{
    const node=document.createElement(tagname);
    for(const [key,value] of Object.entries(attributes)){
        node.setAttribute(key,value);
    }
    for(const elem of children){
        // console.log(elem);
        if(elem.type=="#text"){
            const textNode=document.createTextNode(elem.value);
            node.appendChild(textNode);
        }
        else{
            const subNode=createNode(elem.type,elem.attributes,elem.children);
            node.appendChild(subNode);
        }
        
        
    }
    return node;
}
const vdom=createNode("div",data.attributes,data.children);
const app = document.getElementById("app");
app.parentNode.replaceChild(vdom,app);
console.log(vdom)