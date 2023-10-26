function createElement(type, props, ...children) {
    return {
         type,
         props: {
            ...props,
            children: children.flatMap(child => {
                if (typeof child === 'string' || typeof child === 'number' || typeof child === 'object') {
                    return child;
                }
            }),
        },
        toString: function() {
            return `{"type": '${this.type}',\n "props": ${JSON.stringify(this.props, null, 2)}}`;
        },
    };
}

function elementToString(createdElement) {
    console.log(createdElement.toString());
}

let a = createElement("div");
let b = createElement("div", { id: "home" }, "a", a);
let c = createElement("div", null, 1, 6, [b]);

elementToString(a);
elementToString(b);
elementToString(c);




function renderElement(element, depth = 0) {
    const { type, props } = element;
    const children = props.children;
  
    if (!type) {
        return ""; 
    }
  
    const attributes = Object.keys(props).map(key => {
        if (key === 'children') {
            return '';
        } else {
            return ` ${key}="${props[key]}"`;
        }
    }).join('');
  
    const openingTag = `<${type}${attributes}>`;
    const closingTag = `</${type}>`;
  
    if (!children || children.length === 0) {
        return `${'  '.repeat(depth)}${openingTag}\n${'  '.repeat(depth + 1)}${closingTag}`;
    }
  
    const childHTML = children.map(child => {
        if (typeof child === 'string' || typeof child === 'number') {
            return `${'  '.repeat(depth + 1)}${child}`;
        } else if (typeof child === 'object') {
            return renderElement(child, depth + 1);
        }
    }).join('\n');
  
    return `${'  '.repeat(depth)}${openingTag}\n${childHTML}\n${'  '.repeat(depth)}${closingTag}`;
}
  
const element5 = createElement("a", { id: "based",  class: "based", for: "based"}, "e", 1,);
const element6 = createElement("div", null, element5);

const element4 = createElement("span", { id: "home" });
const element3 = createElement("div", null, "c", [element4]);
const element2 = createElement("p", null, "b", [element3]);
const element1 = createElement("div", { id: "home" }, "a", [element2]);
const element0 = createElement("section", null, element1);

console.log(renderElement(element0));
console.log(renderElement(element6));