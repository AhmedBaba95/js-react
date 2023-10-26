// First set of functions for creating virtual elements

// Create a virtual element with a given type, props, and children
function createElement(type, props, ...children) {
    return {
        type, // The type is the HTML tag name (e.g., 'div', 'a')
        props: {
            ...props,
            // Flatten and combine children, ensuring they are of valid types
            children: children.flatMap(child => {
                if (typeof child === 'string' || typeof child === 'number' || typeof child === 'object') {
                    return child;
                }
            }),
        },
        // Define a toString method to get a JSON-like representation of the element
        toString: function() {
            return `{"type": '${this.type}',\n "props": ${JSON.stringify(this.props, null, 2)}}`;
        },
    };
}

// Log the JSON-like string representation of a created element
function elementToString(createdElement) {
    console.log(createdElement.toString());
}

// Create virtual elements (a, b, and c) and log their string representations
let a = createElement("div");
let b = createElement("div", { id: "home" }, "a", a);
let c = createElement("div", null, 1, 6, [b]);
// elementToString(a);
// elementToString(b);
// elementToString(c);

// Second set of functions for rendering virtual elements to HTML-like strings

// Render a virtual element to an HTML-like string
function renderElement(element, depth = 0) {
    const { type, props } = element;
    const children = props.children;

    if (!type) {
        return "";
    }

    // Generate attribute strings for the opening tag
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

    // Recursively render child elements
    const childHTML = children.map(child => {
        if (typeof child === 'string' || typeof child === 'number') {
            return `${'  '.repeat(depth + 1)}${child}`;
        } else if (typeof child === 'object') {
            return renderElement(child, depth + 1);
        }
    }).join('\n');

    // Combine the opening tag, child content, and closing tag
    return `${'  '.repeat(depth)}${openingTag}\n${childHTML}\n${'  '.repeat(depth)}${closingTag}`;
}

// Create virtual elements (element0, element1, element2, element3, element4, element5, element6)
const element5 = createElement("a", { id: "based",  class: "based", for: "based"}, "e", 1,);
const element6 = createElement("div", null, element5);
const element4 = createElement("span", { id: "home" });
const element3 = createElement("div", null, "c", [element4]);
const element2 = createElement("p", null, "b", [element3]);
const element1 = createElement("div", { id: "home" }, "a", [element2]);
const element0 = createElement("section", null, element1);

// Log the HTML-like string representations of elements element0 and element6
console.log(renderElement(element0));
console.log(renderElement(element6));
